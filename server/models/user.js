var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  twitterId: { type: Number, required: true },
  name: { type: String, required: true },
  displayName: { type: String },
  photoURL: { type: String },
  posts: [ {
    imageURL: { type: String },
    description: { type: String },
    date: { type: Date, default: Date.now },
    likes: [{
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      date: { type: Date, default: Date.now }
    }]
  }]
},
{
  timestamps: true
});


module.exports = mongoose.model('User', User);