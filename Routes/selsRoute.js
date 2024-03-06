const express= require('express');

const selss= express.Router()

const {selsmodel,selsvalidate}= require('../Schemas/selesSchem')
  //const checking= require('../middle_ware')
selss.get('/',async(req,res)=>{
    const selsdata= await selsmodel.find()
    .populate({
        path:"itemid",
        model:"item",
        select:"price qty expred_date"
    })
    selss.get('/:id',async(req,res)=>{
        const id=req.params.id
        const getid= await selsmodel.findById(id)
    res.json(getid)
    })
    res.json(selsdata)
 })
 selss.post('/',async(req,res)=>{
    try {
        const{error}=selsvalidate(req.body)
        if(error){
            return res.json(error.message)
        }
        const selssdata=  await new selsmodel(req.body)
    await selssdata.save()
    res.json(
        {
        status:'Success',
            message:'Successfully Posted',
            info:selssdata
        }
        )
    } catch (error) {
     res.json(error.message)   
    }
 })
 //put
 selss.put('/:id',async(req,res)=>{
    const {id}=req.params
const update= await selsmodel.findByIdAndUpdate(id,req.body,{new:true})
res.json('success fully updated')
 })
 //del
 selss.delete('/:id',async(req,res)=>{
    try {
        const {id}=req.params
    const  delet=await selsmodel.findByIdAndDelete(id) 
    res.json(
        {
            status:'Success',
            message:'Successfully Posted',
            info:delet
        })
    } catch (error) {
        res.json(error.message)
    }
    
 })

module.exports=selss
