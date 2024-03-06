const mongooose= require('mongoose')
const joi= require('joi')
mongooose.pluralize(null)
const catechema= new mongooose.Schema({
name:{
        type:String,
required:true,

    }

},
{timestamps:true})
const catmodel= mongooose.model('catgories',catechema)

const catgrvalidate=(cateinfo)=>{
    const cat= joi.object({
        name:joi.string().required(),     
    })
    return cat.validate(cateinfo)
}
module.exports= {catmodel,catgrvalidate}