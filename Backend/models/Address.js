import mongoose from 'mongoose'
const addressSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    fullName:{
        type:String
    },
    phone:String,
    addressLine:String,
    city:String,
    pincode:String

    
},{timestamps:true})

const Address= mongoose.model("Address",addressSchema)
export default Address