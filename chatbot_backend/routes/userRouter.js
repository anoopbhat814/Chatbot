
const express=require('express')
const { user_signup_Create, user_login_Create } = require('../Controllers/userController')

const UserRouter = express.Router()

UserRouter.post('/signup',user_signup_Create)
UserRouter.post('/login',user_login_Create)

module.exports=UserRouter