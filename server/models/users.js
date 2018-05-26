'use strict';

module.exports = function(Users) {

  Users.disableRemoteMethodByName("prototype.__findById__accessTokens", true);
  Users.disableRemoteMethodByName("prototype.__destroyById__accessTokens", true);
  Users.disableRemoteMethodByName("prototype.__updateById__accessTokens", true);
  Users.disableRemoteMethodByName("prototype.__get__accessTokens", true);
  Users.disableRemoteMethodByName("prototype.__create__accessTokens", true);
  Users.disableRemoteMethodByName("prototype.__delete__accessTokens", true);
  Users.disableRemoteMethodByName("prototype.__count__accessTokens", true);
  Users.disableRemoteMethodByName("patchOrCreate", true);
  Users.disableRemoteMethodByName("replaceOrCreate", true);
  Users.disableRemoteMethodByName("upsertWithWhere", true);
  Users.disableRemoteMethodByName("exists", true);
  Users.disableRemoteMethodByName("replaceById", true);
  Users.disableRemoteMethodByName("findOne", true);
  Users.disableRemoteMethodByName("findById", true);
  Users.disableRemoteMethodByName("updateAll", true);
  Users.disableRemoteMethodByName("deleteById", true);
  Users.disableRemoteMethodByName("count", true);
  Users.disableRemoteMethodByName("prototype.patchAttributes", true);
  Users.disableRemoteMethodByName("createChangeStream", true);
  Users.disableRemoteMethodByName("prototype.verify", true);
  Users.disableRemoteMethodByName("confirm", true);
  Users.disableRemoteMethodByName("resetPassword", true);
  Users.disableRemoteMethodByName("changePassword", true);
  Users.disableRemoteMethodByName("setPassword", true);

  Users.listWithOrders = async function(cb) {
    const _ = require('underscore');
    const Orders = Users.app.models.Orders;
    let usersWithOrders = [];
    let users = await Users.find({});

    for (let user of users) {
      let orders = await Orders.find({"where": {"userId": user.id}});
      user.orders = orders;
      usersWithOrders.push(user);
    }
    
    cb(null, usersWithOrders)
  }

  Users.remoteMethod('listWithOrders', {
    http: {path: '/listWithOrders', verb: 'get'},
    returns: {arg: 'users', type: 'array'}
  });

};
