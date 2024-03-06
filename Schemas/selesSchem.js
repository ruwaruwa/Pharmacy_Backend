const mongoose= require('mongoose')
const joi= require('joi')

const SelsSchema= new mongoose.Schema({
    price:{
    type:Number,
    required:true,
   
},
qty:{
    type:Number,
    required:true,
    
},
customerka:{
    type:String,
    require:true
},
itemid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"item"
    
}
},{timestamps:true})
const selsmodel= mongoose.model('sels',SelsSchema)

const selsvalidate=(selsinfo)=>{
    const sels= joi.object({
        price:joi.number().required(),
        qty:joi.number().required(),
        customerka:joi.string().required(),
        itemid:joi.string()
    })
    return sels.validate(selsinfo)
}
module.exports= {selsmodel,selsvalidate}
