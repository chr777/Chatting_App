const path = process.cwd();
const User = require(`${path}/schemas/users.js`);
const Post = require(`${path}/schemas/messages.js`);
const {
  getUser
} = require(`${path}/models/users.js`);

const {
FieldIsRequired,
UserNotFound
} = require(`${path}/errors/errors.js`);

async function createMessage(username, text) {
  try{
     let user = await User.findUserByUsername(username);
     if(!user)
      throw new UserNotFound();
     let message =  await new Post({
     from: username,
     text: text,
     date: new Date()
      });
     await message.save();
     user.messages.push({_id: message._id});
     await user.updateForDeleteCreate(user.messages);
     return message;
   }
    catch(err){
      if (err.message.includes('is required.'))
       throw new FieldIsRequired();
      if (err.message === new UserNotFound().message)
        throw new UserNotFound();

        console.log(err.stack);
        
    }
}


async function getMessages(){
  return await Post.getMessages();
}



async function getRecentMessages(){
  return Post.getRecentMessages();
}




module.exports = {
  createMessage,
  getMessages,
  getRecentMessages
}