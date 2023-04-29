const mongoose = require('mongoose')

 const ChatSchema = mongoose.Schema({

    questions:{
        type:String,
        default:null
    },
    response:{
        type:String,
        default:null
    },
    type:{
        type:String,
        default:null
    },
    user_id:{
        type: 'ObjectId',
        ref: 'User',
    },
    chatbox_id:{
        type: 'ObjectId',
        ref: 'ChatBox',
    }
    

 },{
    timestamps:true
})

 const Chat = mongoose.model('Chat',ChatSchema)
 module.exports=Chat;