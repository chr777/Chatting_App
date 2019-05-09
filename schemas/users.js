// Create your mongoose user schema here.

const pbkdf2 = require('pbkdf2');
const mongoose = require('mongoose');

const path = process.cwd();


const {
    UserAlreadyExists,
    PasswordIncorrect,
    ValidationError, 
    UserIsLocked
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
        validate: {
            validator: function(v) {
                return v.length >= 4;
            },
            message: new ValidationError().message
        }
},

    first_name: {
        type: String,
        trim: true
    },

    last_name: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Email is required!'],
        trim: true
    },

    password: {
        type: String,
        unique: true,
        required: [true, 'Password is required!'],
        trim: true
    }  
});

UserSchema.pre('save', function (next) {
    this.password = pbkdf2.pbkdf2Sync(this.password, 'salt', 1, 32, 'sha512').toString('hex');
    next();
});

UserSchema.methods.comparePassword = function(password) {
    return this.password === pbkdf2.pbkdf2Sync(password, 'salt', 1, 32, 'sha512').toString('hex');
}

UserSchema.statics.getAllUsers = function(filter) {
    return User.find(filter, {password: false});
}


UserSchema.statics.findUserByUsername = function(username) {
    return User.findOne({username}, {"_id": false, password: false});
}

UserSchema.statics.findUser = function(username) {
    return User.findOne({username}, {"_id": false});
}

UserSchema.statics.newUser = function(body) {
    const user = new User({username: body.username, first_name: body.first_name, last_name: body.last_name, email: body.email, password: body.password });
    user.save();
}

const User = mongoose.model('User', UserSchema);

module.exports = User;



