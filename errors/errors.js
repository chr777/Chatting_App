class UserNotFound extends Error{
    constructor(username){
        super(`User: ${username} was not found!`);
        }
}

class UserAlreadyExists extends Error{
    constructor(user){
        super(`User: ${user} already exists`);
        }
}

class PasswordIncorrect extends Error{
    constructor(){
        super('Password is incorrect. ): Please Try again!')
    }
}

class ValidationError extends Error{
    constructor(){
        super('Username should not be shorter than 4 characters.')
    }
}

class UserIsLocked extends Error{
    constructor(username){
        super(`OOPS: User with ${username} is locked`)
    }
}

module.exports = {
    UserNotFound,
    UserAlreadyExists,
    PasswordIncorrect,
    ValidationError, // Username is shorter than 4 characters
    UserIsLocked // BONUS
}
