const mongoose= require('mongoose')
const joi= require('joi')
const { date } = require('joi')

const ItemsSchema= new mongoose.Schema({
    // expred_date:{
    //     type:Date,
    //     required:true,

    // },
    item_name:{
    type:String,
    required:true
   
},
price:{
    type:String,
    required:true,
    
},
qty:{
    type:Number,
    required:true  
},
// catID:{
//     type:mongooose.Schema.Types.ObjectId,
//     ref:"categor"
// },
subid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"subcat"
}
},{timestamps:true})
const Itemmodel= mongoose.model('item',ItemsSchema)

const itemvalidate=(iteminfo)=>{
    const item= joi.object({
        item_name:joi.string().required(),
        expred_date:joi.date(),
        price:joi.number().required(),
        qty:joi.number().required(),
        // subid:joi.string().required()
    })
    return item.validate(iteminfo)
}
module.exports= {Itemmodel,itemvalidate}
