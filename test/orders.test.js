const app = require('../server/server');
const expect = require('expect');

describe('Test Some Orders Model Methods', function(){
  
  it('count method: should return number of orders', function(cb){
      app.models.Orders.count({}, function(err, count){
        expect(typeof count).toBe('number');
        cb();
      });
  });

  it('findOne method: should return one order', function(cb){
      app.models.Orders.findOne({}, function(err, order){
        expect(typeof order).toBe('object');
        cb();
      });
  });

  it('find method: should return array of orders', function(cb){
      app.models.Orders.find({}, function(err, orders){
        expect(typeof orders).toBe('object');
        expect(typeof orders.length).toBe('number');
        cb();
      });
  });

});
