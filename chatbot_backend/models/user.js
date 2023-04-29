const mongoose = require('mongoose')

 const UserSchema = mongoose.Schema({

    first_name:{
        type:String,
        default:null
    },
    last_name:{
        type:String,
        default:null
    },
    email:{
        type:String,
        default:null
    },
    type:{
        type:String,
        default:null
    },
    phone_number:{
        type:String,
        default:null
    },
    password:{
        type:String,
        default:null
    }

 },{
    timestamps:true
})

 const User = mongoose.model('User',UserSchema)
 module.exports=User;