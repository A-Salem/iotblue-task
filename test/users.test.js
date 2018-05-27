const app = require('../server/server');
const expect = require('expect');

describe('Test Some Users Model Methods', function(){
  
  it('count method: should return number of users', function(cb){
      app.models.Users.count({}, function(err, count){
        expect(typeof count).toBe('number');
        cb();
      });
  });

  it('findOne method: should return one user', function(cb){
      app.models.Users.findOne({}, function(err, user){
        expect(typeof user).toBe('object');
        cb();
      });
  });

  it('find method: should return array of users', function(cb){
      app.models.Users.find({}, function(err, users){
        expect(typeof users).toBe('object');
        expect(typeof users.length).toBe('number');
        cb();
      });
  });

  it('listWithOrders method: should return array of users with their orders without error', function(cb){
      app.models.Users.listWithOrders((err, users)=>{
        expect(err).toBe(null);
        expect(typeof users).toBe('object');
        expect(typeof users.length).toBe('number');
        cb();
      })

  });

});
