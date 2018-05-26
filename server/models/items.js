'use strict';

module.exports = function(Items) {

  // Make propery sku in items model unique
  Items.validatesUniquenessOf('sku');

  // Disable not needed remote methods
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
