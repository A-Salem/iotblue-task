'use strict';

module.exports = function(Items) {

  Items.validatesUniquenessOf('sku');

  Items.disableRemoteMethodByName("patchOrCreate", true);
  Items.disableRemoteMethodByName("replaceOrCreate", true);
  Items.disableRemoteMethodByName("upsertWithWhere", true);
  Items.disableRemoteMethodByName("exists", true);
  Items.disableRemoteMethodByName("findById", true);
  Items.disableRemoteMethodByName("replaceById", true);
  Items.disableRemoteMethodByName("findOne", true);
  Items.disableRemoteMethodByName("updateAll", true);
  Items.disableRemoteMethodByName("deleteById", true);
  Items.disableRemoteMethodByName("count", true);
  Items.disableRemoteMethodByName("prototype.patchAttributes", true);
  Items.disableRemoteMethodByName("createChangeStream", true);

};
