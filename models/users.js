const path = process.cwd();

const User = require(`${path}/schemas/users.js`);

const {
    UserNotFound,
    UserAlreadyExists,
    PasswordIncorrect,
    ValidationError, 
    //UserIsLocked
} = require(`${path}/errors/errors.js`);

async function login(username, password) {

    let user = await User.findUser(username); // Call corresponding schema function to retrieve the user
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

async function createUser(username, password) {
    try{  
         // Call corresponding schema function to create a user.
        const user = await User.newUser({username: username, password: password});
    }      
   catch(err){      // Catch that error here and throw UserAlreadyExists error instead.
        throw new UserAlreadyExists(username);
        // If the user already exists mongoose should throw an error.
    }
}

module.exports = {
    login,
    getUser,
    getAllUsers,
    createUser
}
