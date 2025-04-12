import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import bookRouter from './routes/bookRoute.js'
import userRouter from './routes/userRoute.js'
import orderRouter from './routes/orderRoute.js'


// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//midllewares
app.use(express.json())
app.use(cors())

// Api endpoints
app.use('/api/book', bookRouter)
app.use('/api/user', userRouter)
app.use('/api/order', orderRouter)

app.get('/', (req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=>console.log('Server started on PORT : '+ port))