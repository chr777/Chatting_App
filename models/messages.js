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

async function createMessage(username, from, text) {
  console.log(description);
  try{
     let user = await User.getUserByUsername(email);
     console.log(user);
     if(!user)
      throw new UserNotFound();
     let message =  await new Post({
     from: username._id,
     text: text,
     date: new Date()
      });
     await message.save();
     console.log(message);
     user.messages.push({_id: post._id});
     await user.updateForDeleteCreate(user.messages);
     return message;
   }
    catch(err){
      if (err.message.includes('is required.'))
       throw new FieldIsRequired();
      if (err.message === new UserNotFound().message)
        throw new UserNotFound();
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