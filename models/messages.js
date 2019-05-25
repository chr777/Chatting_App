const path = process.cwd();
const User = require(`${path}/schemas/users.js`);
const Message = require(`${path}/schemas/messages.js`);
const {
  getUser
} = require(`${path}/models/users.js`);

const {
FieldIsRequired,
UserNotFound
} = require(`${path}/errors/errors.js`);

async function createMessage(body) {
  try{
    let user = await User.findUserByUsername(body.username);
    console.log(user);
     if(!user)
      throw new UserNotFound();
     const message =  await new Message({
     from: body.username,
     text: body.text,
     date: new Date()
      });
     await message.save();
     await user.update(body.text);
     return message;
   }
    catch(err){
      if (err.message === new UserNotFound().message)
        throw new UserNotFound();

        console.log(err.stack);        
    }
}


async function getMessages(){
  const message = await Message.getAllMessages();
  return message; 
}



async function getRecentMessages(){
  return Message.getRecentMessages();
}


module.exports = {
  createMessage,
  getMessages,
  getRecentMessages
}