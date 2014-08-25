var mongoose = require('mongoose');
//replace with remote key
mongoose.connect('mongodb://MongoLab:BCI_Hz44NHH5blCjbTpBeCmPpIXMdGSYg5jrP8jx1uA-@ds052827.mongolab.com:52827/MongoLab');

var db = mongoose.connection;

db.on('error', function(){
  //can't connect to remote db, connect to local
  mongoose.connect('mongodb://admin:123456@localhost/shortly');
  db = mongoose.connection;

  db.on('error', function(err){
    console.log(err);
  });
});

db.once('open', function(){
  console.log('Connection successful');
});

module.exports = db;

// var Bookshelf = require('bookshelf');
// var path = require('path');

// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: process.env.HOST || '0.0.0.0',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// module.exports = db;
