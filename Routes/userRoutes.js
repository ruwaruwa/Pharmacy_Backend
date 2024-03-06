const express= require('express')
let bcrypt= require('bcrypt')
let jwt= require('jsonwebtoken')
const user= express.Router()
 //const checking= require('../middle_ware')
const { uservalidate, usersmodel } = require('../Schemas/USERSchem')
//const { use } = require('./cateRoute')
user.get('/',async(req,res)=>{
    const data= await usersmodel.find().populate({
        path:"selsId",
        model:"sels",
        select:"customerka price qty"
    })
    res.json(data)
})
user.get('/:id',async(req,res)=>{
    const id=req.params.id
    const getid= await usersmodel.findById(id)
res.json(getid)
})
user.put('/:id',async(req,res)=>{
    const id=req.params.id
    const update= await usersmodel.findByIdAndUpdate(id,req.body,{new:true})
})
user.delete('/:id',async(req,res)=>{
    const id=req.params.id
    const del= await usersmodel.findByIdAndDelete(id)
    res.json('succesfly deleted')
})
 user.post('/',async(req,res)=>{
   try {
    const{error}=uservalidate(req.body)
    if(error){
        return res.json(error.message)
    }
    const userobj= await new usersmodel(req.body)

    const salt= await bcrypt.genSalt(10)

    userobj.password= await bcrypt.hash(userobj.password,salt)
    

    await userobj.save()
const token=jwt.sign({
    id:userobj._id,
    username:userobj.username,
    password:userobj.password
},"SecretKey")


     res.json({message:'succesfully posted',token:token})
   } catch (error) {
    res.json(error.message)
   }
})
// userroute.post('/login', async(req,res)=>{
//     const login=await usermodel.findOne({username:req.body.username})
//     if(!login)return res.json("in valid username")
//     const checkpass= await bcrypt.compare(req.body.password.login.password)
//     if(!checkpass) return res.json("in valid username or password")
    
// })
module.exports= user