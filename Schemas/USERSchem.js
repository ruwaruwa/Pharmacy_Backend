const mongoose= require('mongoose')
const Joi= require('joi')

const userchema= new mongoose.Schema({
    selsId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"sels"
    },
    username:{
        type:String,
        required:false,
        unique:true
    },

    password:{
        type:String,
       required:true
    },
    userstatus:{
        type:String,
        default:'active',
        enum:["active","pendin","blocked"]
    }
   

},{timestamps:true})
const usersmodel= mongoose.model("users",userchema)
const uservalidate=(userinfo)=>{
    const user= Joi.object({
     selsId:Joi.string(),
    username:Joi.string().email().required(),
    password:Joi.string().required(),
     userstatus:Joi.string()
    })
    return user.validate(userinfo)
}
module.exports= {usersmodel,uservalidate}