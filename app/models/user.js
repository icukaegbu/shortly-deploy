var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//user = mongoose.model('User', db.userSchema);
var UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true} },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next){
  var user = this;
  console.log('Inside pre');
  if (user.isModified('password')){
    //hash password
    //user.hashPassword();
    console.log('Inside hashing');
    bcrypt.hash(user.password, null, null, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  }else{
    next();
  }
});

UserSchema.methods.comparePassword = function(attemptedPassword, callback) {
  console.log('In comparePassword. attemptedPassword: '+attemptedPassword+' --- Actual: '+this.password);
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    console.log('compare result: '+isMatch);
    callback(err, isMatch);
  });
};

UserSchema.methods.hashPassword = function(){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
    });
};

//compile schema into model and export
var User = mongoose.model('User', UserSchema);

module.exports = User;


// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function(){
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

// module.exports = User;
