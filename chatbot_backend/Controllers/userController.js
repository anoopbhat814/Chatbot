const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require("fs");
const SECRET_KEY = "NOTESAPI"

const user_signup_Create = async (req, res) => {

    const { first_name, last_name, email, type, phone_number, password } = req.body

    if (!email) {
        return res.status(422).json({ success: false, message: "Please  required email" })
    }
    if (!password) {
        return res.status(422).json({ success: false, message: "Please  required password" })
    }

    try {
        const existingUser = await userModel.findOne({ email: email }, { phone_number: phone_number });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email or Phone number already exists" })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const result = new userModel({ first_name, last_name, email, type, phone_number, password: hashPassword })
        await result.save()
        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
        res.status(201).json({ success: true, message: "User Signup Successfully!", user: result, token: token })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Something went Wrong!" })
    }



}

const user_login_Create = async (req, res) => {

    const { email, type, phone_number, password } = req.body;

    try {
        
        const existingUser = await userModel.findOne({ "$or": [{ email: email }, { phone_number: phone_number }] });
        if (!existingUser) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }


        if (existingUser.type == 'google') {
           
            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
            res.status(201).json({ success: true, message: "User Login with google Successfully!", user: existingUser, token: token })

        }
        else {
           

            const matchPassword = await bcrypt.compare(password, existingUser.password)
            if (!matchPassword) {
                return res.status(400).json({ success: false, message: "Invalid Password!" })
            }
            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
            res.status(201).json({ success: true, message: "User Login Successfully!", user: existingUser, token: token })
        }




        // }

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Something went Wrong!" })
    }
}




module.exports = { user_signup_Create, user_login_Create }