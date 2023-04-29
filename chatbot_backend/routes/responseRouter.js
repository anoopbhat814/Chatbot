
const express=require('express')
const { craete_response,fetch_response } = require('../Controllers/responseController')


const ResRouter = express.Router()

ResRouter.post('/create',craete_response)
ResRouter.get('/random',fetch_response)

module.exports=ResRouter