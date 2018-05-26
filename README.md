## IotBlue
Backend Service using NodeJS


## Technologies
>The project is generated by LoopBack.

## How it works
1. In the directory of your app run ```npm install```
2. Our database is MongoDB, use ```mongorestore --host localhost --port 27017  dump``` for restoring iotblue database
3. Use Robomongo for checking our data
4. In the users collection there are three users and here are their passwords
    * Admin: sfjmh3204/
    * a: 11111111
    * b: 11111111
5. To start the service run ```node .``` OR ```nodemon .``` if you have nodemon globally installed.
6. Visit ```localhost:3000/explorer``` for using methods and restful endpoint for our service OR use Postman for using the sample data if you have the postman collection
## Testing
>To run test on our loopback methods. In the directory of your app run:

    npm test || npm run test-watch
