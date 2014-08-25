var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LinkSchema = new Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }  
});

LinkSchema.pre('save', function(next){
  //var link = this;
  console.log('In pre, creating hash');
  var shasum = crypto.createHash('sha1');
  console.log(this.url);
  shasum.update(this.url);
   console.log('In pre, digesting');
  this.code = shasum.digest('hex').slice(0, 5);
  console.log('After digesting: '+this.code);
  next();
  // shasum.update(link.get('url'));
  // link.set('code', shasum.digest('hex').slice(0, 5));
});

//compile schema into model and export
var Link = mongoose.model('Link', LinkSchema);

module.exports = Link;




// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

// module.exports = Link;
