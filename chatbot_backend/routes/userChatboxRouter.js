
const express = require('express');
const { create_chatBox, fetch_chatBox, fetch_single_chatbox, update_chatbox, delete_chatbox } = require('../Controllers/chatboxController');

const UserBoxRouter = express.Router();

UserBoxRouter.post('/create',create_chatBox)
UserBoxRouter.get('/get_catbox/:userId',fetch_chatBox)
UserBoxRouter.get('/get_single_chatbox/:id',fetch_single_chatbox)
UserBoxRouter.post('/update',update_chatbox)
UserBoxRouter.delete('/delete/:id',delete_chatbox)

module.exports = UserBoxRouter