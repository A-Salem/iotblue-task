'use strict';

module.exports = async function(app) {

  const Users = app.models.Users;
  const Role = app.models.Role;
  const RoleMapping = app.models.RoleMapping;
  const Items = app.models.Items;
  const Orders = app.models.Orders;

  let userFound = await Users.findOne({});

  if(!userFound){
    Users.create([
        {username: 'Admin', email: 'admin@local.com', password: 'sfjmh3204/'}
    ], function(err, users) {
        if (err) return console.log(err);

        // Adding admin role
        Role.create({
          name: 'admin'
        }, function(err, role) {
          if (err) return console.log(err);

          // Make Admin User an admin
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: users[0].id
          }, function(err, principal) {
            if (err) return console.log(err);
          });
        });

      });
  }

}
