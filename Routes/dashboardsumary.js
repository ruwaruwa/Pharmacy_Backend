const express= require('express');

const selss= express.Router()
const { catmodel, catgrvalidate } = require('../Schemas/catSchema')
const {Itemmodel,itemvalidate}= require('../Schemas/ItemSchem')
const {submodels,subvalidate}= require('../Schemas/SUBschem')
const {selsmodel,selsvalidate}= require('../Schemas/selesSchem')
selss.get('/',async (req,res)=>{
    //res.send('dashboard sumary')
    let catmodeldata= await  catmodel.find()
    let numbcategory=catmodeldata.length;

    let Itemmodeldata= await  Itemmodel.find()
    let numitemdata=Itemmodeldata.length;

    let submodelsdata= await  submodels.find()
    let numsubdata=submodelsdata.length;

    let selsmodeldata= await  selsmodel.find()
    let numselsdata=selsmodeldata.length;
    let totalsels=selsmodeldata.reduce((total,item)=>total+item.qty,0)
    let totalprice=selsmodeldata.reduce((total,item)=>total+item.price,0)
    res.send({
        numbcategory:numbcategory,
        numitemdata:numitemdata,
        numsubdata:numsubdata,
        numselsdata:numselsdata,
        qty:totalsels,
        price:totalprice
    })
})
module.exports=selss