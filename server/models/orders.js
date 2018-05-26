'use strict';

module.exports = function(Orders) {

  // Disable not needed remote methods
  Orders.disableRemoteMethodByName("patchOrCreate", true);
  Orders.disableRemoteMethodByName("replaceOrCreate", true);
  Orders.disableRemoteMethodByName("upsertWithWhere", true);
  Orders.disableRemoteMethodByName("exists", true);
  Orders.disableRemoteMethodByName("findById", true);
  Orders.disableRemoteMethodByName("replaceById", true);
  Orders.disableRemoteMethodByName("findOne", true);
  Orders.disableRemoteMethodByName("updateAll", true);
  Orders.disableRemoteMethodByName("deleteById", true);
  Orders.disableRemoteMethodByName("count", true);
  Orders.disableRemoteMethodByName("prototype.patchAttributes", true);
  Orders.disableRemoteMethodByName("createChangeStream", true);


  // Using find method hook for return only current user's orders
  Orders.beforeRemote('find', function(ctx, modelInstance, next) {

    if(!ctx.res.req.accessToken){
      return next({statusCode: 403, message: `Not permitted`})
    }
    let userId = ctx.res.req.accessToken.userId;
    ctx.req.remotingContext.args.filter = {"where": {"userId": userId}};
    next();

  });


  // Using before create method hook for validating the order and adding userId, invoiceValue and etc
  Orders.observe('before save', async function filterProperties(ctx, next) {

    if(ctx.isNewInstance){

      const Items = Orders.app.models.Items;
      let orderItems = ctx.instance.items;
      let userId = ctx.options.accessToken.userId;
      let totalItems = 0, invoiceValue = 0;

      await new Promise(function(resolve, reject) {
        orderItems.forEach(async function(orderItem, index) {
          let item = await Items.findOne({"where": {"sku": orderItem.sku}});
          orderItem.name = item.name;
          totalItems += orderItem.qty;
          invoiceValue += item.price * orderItem.qty;
          if(!orderItem.sku || !orderItem.qty)
            reject({statusCode: 403, message: `Invalid item`});
          if(!item)
            reject({statusCode: 403, message: `Item of sku('${orderItem.sku}') not available`});
          if(orderItem.qty > item.quantity)
            reject({statusCode: 403, message: `Quantity of item of sku('${orderItem.sku}') not available`});
          if(++index == orderItems.length)
            resolve();
        });
      });

      ctx.instance.userId = userId;
      ctx.instance.totalItems = totalItems;
      ctx.instance.invoiceValue = invoiceValue.toFixed(3);
      ctx.instance.createdAt = new Date();

    }

    next();

  });

  // Using after create method hook for modifying items' quantities after creating an order
  Orders.observe('after save', function filterProperties(ctx, next) {

    if(ctx.isNewInstance){
      const Items = Orders.app.models.Items;
      let orderItems = ctx.instance.items;
      orderItems.forEach(async function(orderItem, index) {
        let item = await Items.findOne({"where": {"sku": orderItem.sku}});
        let newQuantity = item.quantity - orderItem.qty
        Items.update({sku: orderItem.sku}, {quantity: newQuantity});
      });
    }

    next();

  });


};
