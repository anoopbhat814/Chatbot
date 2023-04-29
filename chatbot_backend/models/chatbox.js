const mongoose = require('mongoose')

 const ChatBoxSchema = mongoose.Schema({

    questions:{
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
    chat_id:[{
        type: 'ObjectId',
        ref: 'User',
    }]
    

 },{
    timestamps:true
})

 const ChatBox = mongoose.model('ChatBox',ChatBoxSchema)
 module.exports=ChatBox;