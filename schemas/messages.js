const mongoose = require('mongoose');

const path = process.cwd();


const {
    // I wiil decide what errors we need here later
}
 = require(`${path}/errors/errors.js`);

<<<<<<< HEAD

=======
 
>>>>>>> c5f918bbdcf3f98476b59db23651ef08af814305


const MessageSchema = new Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
<<<<<<< HEAD

=======
    
>>>>>>> c5f918bbdcf3f98476b59db23651ef08af814305
    messages : [
        {
            message : String,
            meta : [
                {
                    user : {
                        type : mongoose.Schema.Types.ObjectId,
                        ref : 'User'
                    },
                    delivered : Boolean,
                    read : Boolean
                }
            ],
            validate: {
                validator: function(v) {
                    return v.length >= 1;
                },
                message: new ValidationError().message
            }
<<<<<<< HEAD

=======
            
>>>>>>> c5f918bbdcf3f98476b59db23651ef08af814305
        }
    ],
    // is_group_message : { type : Boolean, default : false },
    // participants : [
    //     {
    //         user :  {
    //             type : mongoose.Schema.Types.ObjectId,
    //             ref : 'User'
    //         },
    //         delivered : Boolean,
    //         read : Boolean,
    //         last_seen : Date
    //     }
    // ]
});

// UserSchema.statics.newMessage = function(body) {
//     const message = new Message({sender: body.username, });
//     message.save();
// }

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
<<<<<<< HEAD
=======

>>>>>>> c5f918bbdcf3f98476b59db23651ef08af814305
