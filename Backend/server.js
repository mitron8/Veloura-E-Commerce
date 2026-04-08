import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import  connectDB  from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from './routes/cartRoutes.js'
import addressRoutes from './routes/addressRoutes.js'
import orderRouter from './routes/orderRoutes.js'
dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoutes);
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/address",addressRoutes)
app.use("/api/order",orderRouter)
app.get('/',(req,res)=>{
    res.send("api is running")
})
connectDB()
app.listen(process.env.PORT,()=>{
    console.log("app is running in port 5001")

})