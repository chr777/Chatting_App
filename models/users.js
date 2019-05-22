const path = process.cwd();

const User = require(`${path}/schemas/users.js`);

const {
    UserNotFound,
    UserAlreadyExists,
    PasswordIncorrect,
    ValidationError, 
    FieldIsRequired
} = require(`${path}/errors/errors.js`);

async function login(username, password) {

    let user = await User.ﬁndUserForLogin(username); // Call corresponding schema function to retrieve the user
    if(!user){                                // if the user is not found, throw UserNotFound error.
        throw new UserNotFound(username);
    }
    if(!(await user.comparePassword(password))){ // if the passwords do not match, throw PasswordIncorrect error.
        throw new PasswordIncorrect();
    }
    return user;
}

async function getUser(username) {
    let user = await User.findUserByUsername(username);    // Call corresponding schema function to retrieve the user

    if(!user){
        throw new UserNotFound(username);
    }

    return user;
}

async function getAllUsers() {
    const user = await User.getAllUsers({}); // Call corresponding schema function to retrieve all users and return the result.
    return user;
}

async function createUser(body) {
  try {
      const user = await new User({
      username: body.username,
      password: body.password,
      messages: [],
    });
    await user.save();
    const socketio = req.app.get('socketio');
    socketio.emit('student-saved', student);
  } catch (err) {
    if (err.message.includes('Invalid user!')) {
      throw new ValidationError();
    } else if (err.message.includes('duplicate key')) {
      throw new UserAlreadyExists();
    }
    if (err.message.includes('is required.'))
      throw new FieldIsRequired();
  }
}

module.exports = {
    login,
    getUser,
    getAllUsers,
    createUser
}


  


