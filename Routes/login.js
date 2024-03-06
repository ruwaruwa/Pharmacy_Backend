const express= require('express')

const login= express.Router()
const jwt= require('jsonwebtoken')
const bcrypt= require('bcrypt')
const { uservalidate, usersmodel } = require('../Schemas/USERSchem')
login.get('/', async(req,res)=>{
    const data= await usersmodel.find()
   
    res.json(data)
})

login.post('/',async(req,res)=>{
   try {
    
    
    const logidata= await usersmodel.findOne({username:req.body.username})
    if(!logidata) return res.json("invalid username")
    const checkpass= await bcrypt.compare(req.body.password,logidata.password)
 if(!checkpass) return res.send({status:"error",massage:"username or password"})
 
 const token=jwt.sign({
    id:logidata._id,
    username:logidata.username,
    password:logidata.password
 },"keygenerator")
   
 res.header("token",token).json({
   status:'Success',
   message:"Successfully Logged",
   token:token
})
   } catch (error) {
    res.json(error.message)
   }
})
module.exports= login