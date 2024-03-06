const express= require('express');
const sub= express.Router()

const {submodels,subvalidate}= require('../Schemas/SUBschem')
 //const checking= require('../middle_ware')
sub.get('/',async(req,res)=>{
    const data= await submodels.find()
    .populate({
        path:"catID",
        model:"catgories",
        select:"name" 
    })
    res.json(data)
 })
 sub.get('/:id',async(req,res)=>{
    const id=req.params.id
    const getid= await submodels.findById(id)
res.json(getid)
})
 sub.post('/',async(req,res)=>{
    try {
        const{error}=subvalidate(req.body)
        if(error){
            return res.json(error.message)
        }
        const objdata= await new submodels(req.body)
    await objdata.save()
    res.json(
        {
            status:'Success',
            message:'Successfully Posted',
            info:objdata
        }
        )
    } catch (error) {
     res.json(error.message)   
    }
 })
 //pud
 sub.put('/:id',async(req,res)=>{
    const {id}=req.params
const update= await submodels.findByIdAndUpdate(id,req.body,{new:true})
res.json('success fully updated')
 })
 //del
 sub.delete('/:id',async(req,res)=>{
    const {id}=req.params
    const  delet=await submodels.findByIdAndDelete(id)
    res.json('success fuly deleted')
 })

module.exports=sub

