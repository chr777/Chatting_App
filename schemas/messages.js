const mongoose = require('mongoose');

const path = process.cwd();


// const {
//     // I wiil decide what errors we need here later
// }
//  = require(`${path}/errors/errors.js`);

 
 const MessageSchema = mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  
  date: Date
});


MessageSchema.statics.getAllMessages = function() {
  return Message.find({});
}


MessageSchema.statics.getRecentMessages = function() {
 return Message.find({}).sort({ date: -1 }).limit(10);
}



const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
