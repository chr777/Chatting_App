// Creating  mongoose user schema here.

const pbkdf2 = require('pbkdf2');
const mongoose = require('mongoose');
const Message = require('./messages.js');

const path = process.cwd();


const {
    UserAlreadyExists,
    // PasswordIncorrect,
    // ValidationError, 
}
 = require(`${path}/errors/errors.js`);


const UserSchema = new mongoose.Schema({
    username: {
      type: String,
        lowercase: true,
        required: [true, 'Username is required!'],
        unique: true,
        trim: true,
        unique: [true, new UserAlreadyExists(this.username).message],  
            },

    // email: {
    //     type: String,
    //     lowercase: true,
    //     unique: true,
    //     required: [true, 'Email is required!'],
    //     trim: true
    // },

    password: {
      type: String,
        unique: true,
        required: [true, 'Password is required!'],
        trim: true
    },
    messages: [{
      type: 'ObjectId',
      ref: Message
    }]
});

  UserSchema.pre('save', function(next) {
    this.password = pbkdf2.pbkdf2Sync(this.password, 'salt', 1, 32, 'sha512').toString('hex');
    next();
  });
  
  UserSchema.methods.comparePassword = function(password) {
    return this.password === pbkdf2.pbkdf2Sync(password, 'salt', 1, 32, 'sha512').toString('hex');
}

UserSchema.statics.getAllUsers = function(filter) {
    return User.find(filter, {password: false});
}
UserSchema.statics.ﬁndUserForLogin = function(email) {
  return user = User.findOne({username: username}, {
    _id: false
  });
}
  
UserSchema.statics.findUserByUsername = function(username) {
    return User.findOne({username}, {"_id": false, password: false});
}

UserSchema.methods.updateForDeleteCreate = function(messages) {
  User.update({
    username: this.username
  }, {
    messages: messages
  }, function(err, affected, resp) {
    console.log(affected);
  });
}


  
  const User = mongoose.model('User', UserSchema);
  
  
  module.exports = User;




