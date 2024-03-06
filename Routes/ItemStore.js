const express= require('express');

const items= express.Router()

const {Itemmodel,itemvalidate}= require('../Schemas/ItemSchem')
 //const checking= require('../middle_ware')
items.get('/',async(req,res)=>{
    const itemdata= await Itemmodel.find()
    .populate({
        path:"subid",
        model:"subcat",
        select:"subname"
    })
    
    res.json(itemdata)
 })
 items.get('/:id',async(req,res)=>{
    const id=req.params.id
    const getid= await Itemmodel.findById(id)
res.json(getid)
})
 items.post('/',async(req,res)=>{
    try {
        const{error}=itemvalidate(req.body)
        if(error){
            return res.json(error.message)
        }
        const itemsdata= await new Itemmodel(req.body)
    await itemsdata.save()
res.json({
    status:'Success',
    message:'Successfully Posted',
    info:itemsdata
})
    } catch (error) {
     res.json(error.message)   
    }
})
    //put
    // items.put('/:id',async(req,res)=>{
    //     const {id}= req.params
    //     const updte= await Itemmodel.findByIdAndUpdate(id,req.body,{new:true})
    //     res.json('wala update gareye')
    // })
    items.put('/:id',async(req,res)=>{
        const id=req.params.id
    const update= await Itemmodel.findByIdAndUpdate(id,req.body,{new:true})
    res.json('success fully updated')
     })
    //del
    items.delete('/:id',async(req,res)=>{
        const {id}= req.params
        const del= await Itemmodel.findByIdAndDelete(id)
        res.json('wala delete garayey')
    })
 
module.exports=items
