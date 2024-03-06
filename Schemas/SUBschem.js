
const mongooose= require('mongoose')
let joi= require('joi')
const subchema= new mongooose.Schema({
    subname:{
        type:String,
required:true,

    },

describtion:{
    type:String,
    required:true
},
catID:{
        type:mongooose.Schema.Types.ObjectId,
        ref:"catgories"
    },
},{timestamps:true})
const submodels= mongooose.model('subcat',subchema)

const subvalidate=(subinfo)=>{
const subobj=joi.object({
    subname:joi.string().required(),
    describtion:joi.string().required(),
    catID:joi.string()
})
    
    return subobj.validate(subinfo)
}
module.exports= {submodels,subvalidate}
