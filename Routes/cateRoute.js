const express = require('express');

const joi = require('joi')
const cat = express.Router()

const { catmodel, catgrvalidate } = require('../Schemas/catSchema')
//const checking= require('../middle_ware')
cat.get('/', async (req, res) => {
    const data = await catmodel.find()
    res.json(data)
})
cat.get('/:id', async (req, res) => {
    const id = req.params.id
    const getid = await catmodel.findById(id)
    res.json(getid)
})
cat.post('/', async (req, res) => {
    try {
        const { error } = catgrvalidate(req.body)
        if (error) {
            return res.json(error.message)
        }
        const objdata = await new catmodel(req.body)
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
    
    //put
    cat.put('/:id',async(req,res)=>{
        const {id}= req.params
        const upd= await catmodel.findByIdAndUpdate(id,req.body,{new:true})
        res.json('success fuly updated')
    })
    
    cat.delete('/:id',async(req,res)=>{
        const del= await catmodel.findByIdAndDelete(req.params.id)


        res.json('wala delete garayey');
    })


module.exports = cat
