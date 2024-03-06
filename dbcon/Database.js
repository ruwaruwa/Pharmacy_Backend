const mongoose= require('mongoose');
mongoose.set('strictQuery',false);
dbconected= async()=>{
    try {
        // await mongoose.connect('mongodb://127.0.0.1:27017/MY_PHarmcy')
        await mongoose.connect('mongodb+srv://amiira123:12345@cluster0.xdvvzfc.mongodb.net/MY_PHarmcy')
        console.log('DB connected')
    } catch (error) {
       console.log(error) 
    }
}
module.exports=dbconected