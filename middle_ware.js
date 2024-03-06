const jwt=require('jsonwebtoken')
const checking= (req,res,next)=>{
    try {
        const token=req.header("token")
        if(!token) return res.json("you dont have token!")
        const userrtoken= jwt.verify(token,"keygenerator")
        if(userrtoken){
            next()
        }
    } catch (error) {
       res.json(error.message) 
    }
}
module.exports=checking