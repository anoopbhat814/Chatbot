
const chatBoxModel = require('../models/chatbox')
const chatModel = require("../models/chat")

const create_chatBox = async (req, res) => {

    const { name, user_id } = req.body;

    try {
        //const chatbbox = new chatBoxModel({ name, user_id })

        const chatbbox = new chatBoxModel({ name, user_id })
        await chatbbox.save()
        res.status(201).json({ success: true, data: chatbbox })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Something went Wrong!" })
    }

}

const fetch_chatBox = async (req, res) => {
    try {

        const result = await chatBoxModel.find({ "user_id": req.params.userId })
        .populate('user_id')
        .populate('chat_id')
        res.status(201).json({ success: true, data: result })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Something went Wrong!" })
    }

}

const fetch_single_chatbox = async (req,res) =>{

    try {

        const result = await chatBoxModel.findById({_id: req.params.id })
        .populate('user_id')
        .populate('chat_id')
        res.status(201).json({ success: true, data: result })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Something went Wrong!" })
    }

}

const update_chatbox = async (req,res)=>{

    try{

        const {questions,chat_id, type, user_id}=req.body
           const chotBox_id = req.body.chotBox_id
            if(!chotBox_id){
                return res.status(422).json({success:false,message:"Please required chotBox_id for Update!"})
            }
           const chatBox =  await chatBoxModel.findByIdAndUpdate({_id:chotBox_id},{$set:{
            questions:questions,
            // chat_id:chat_id,
            // type:type,
             user_id:user_id
            
           }})
           res.status(201).send({success:true,message:"ChatBox has been Updated! successfully!"})


    }catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Something went Wrong!" })
    }

}

const delete_chatbox = async (req,res)=>{

    try{

        const delete_chatbox= await chatBoxModel.findByIdAndDelete(req.params.id)
        const delete_chat= await chatModel.deleteMany({"chatbox_id":req.params.id})
        
          res.status(201).send({success:true,message:"ChatBox Delete Successfully"})

    }catch(err){
        console.log(err)
        res.status(500).json({ success: false, message: "Something went Wrong!" })
    }
    
}

module.exports = { create_chatBox, fetch_chatBox, fetch_single_chatbox,update_chatbox,delete_chatbox}