const chatModel = require('../models/chat');
const chatBoxModel = require('../models/chatbox')
const faker = require('faker');
const _ = require('lodash');


const create_chat = async (req, res) => {
    const { questions, type, user_id, chatbox_id } = req.body;

    if (!user_id) {
        return res.status(422).json({ success: false, message: "Please  required user_id" })
    }

    try {

        if (type === 'New') {

            const chatbox = new chatBoxModel({ questions, type, user_id })

            await chatbox.save()
            const lorem = faker.lorem;
            const chat = new chatModel({ questions,type, response: lorem.paragraph(), user_id, chatbox_id: chatbox._id })
            const chatboxId = await chatBoxModel.findById(chatbox._id)
            await chatboxId?.chat_id?.push(chat)
            await chatboxId?.save()


            await chat.save()

            res.status(201).json({ success: true, data: chat })
        }
        if (type === 'Old') {
            const lorem = faker.lorem;
            const chat = new chatModel({ questions,type, response: lorem.paragraph(), user_id, chatbox_id })
            const chatboxId = await chatBoxModel.findById(chatbox_id)
            await chatboxId?.chat_id?.push(chat)
            await chatboxId?.save()

            await chat.save()
            res.status(201).json({ success: true, data: chat })

        }





    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Something went Wrong!" })
    }

}

const fetch_chat = async (req, res) => {
    try {

        const result = await chatModel.find({ "user_id": req.params.userId })
        //.populate('user_id')
        res.status(201).json({ success: true, data: result })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Something went Wrong!" })
    }


}

module.exports = { create_chat, fetch_chat }