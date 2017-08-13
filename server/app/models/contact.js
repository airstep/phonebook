let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//contact schema definition
let ContactSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    picture: { type: String, required: true },
    phone: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },    
  }, 
  { 
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
ContactSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the ContactSchema for use elsewhere.
module.exports = mongoose.model('contact', ContactSchema);