
const express = require('express');

const { create_chat, fetch_chat } = require('../Controllers/chatController');
const ChatRouter = express.Router();

ChatRouter.post('/create',create_chat)
ChatRouter.get('/get_cat/:userId',fetch_chat)


module.exports = ChatRouter