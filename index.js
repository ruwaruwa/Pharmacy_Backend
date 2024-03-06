const express= require('express');
const cors= require('cors')
const dbconected= require('./dbcon/Database')
dbconected()

const cat= require('./Routes/cateRoute')
const sub= require('./Routes/Subroute')
const items= require('./Routes/ItemStore')
const selss= require('./Routes/selsRoute')
//const users= require('./Routes/userRoutes');
const user = require('./Routes/userRoutes');
const login= require('./Routes/login')
const dashboardsumary= require('./Routes/dashboardsumary')
const app= express();
//conte
//comentedted//////////////
app.get('/',(req,res)=>{
    res.send('STARTED')
})
app.use(cors())
app.use(express.json())
app.use('/login',login)
app.use('/sumary',dashboardsumary)
app.use('/users',user)
app.use('/catgories',cat)
app.use('/subcat',sub);
app.use('/item',items)
//cors
 app.use('/sels',selss)
app.listen(2000,()=>{
    console.log('started')
})
