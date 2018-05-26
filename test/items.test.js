const app = require('../server/server');
const expect = require('expect');

describe('Test Some Items Model Methods', function(){
  it('count method: should return number of items', function(cb){
      app.models.Items.count({}, function(err, count){
        expect(typeof count).toBe('number');
        cb();
      });
  });

  it('findOne method: should return one item', function(cb){
      app.models.Items.findOne({}, function(err, item){
        expect(typeof item).toBe('object');
        cb();
      });
  });

  it('find method: should return array of items', function(cb){
      app.models.Items.find({}, function(err, items){
        expect(typeof items).toBe('object');
        expect(typeof items.length).toBe('number');
        cb();
      });
  });

});
