import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signupUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        // check user already exists?
        const userExist=await User.findOne({email})
        if(userExist){
            return res.status(400).json({message:"user already exist"})
        }
        const hashPassword = await bcrypt.hash(password,10)

        //create User
        await User.create(
            {
                name,
                email,
                password:hashPassword
            }
        )
        res.json({message:"user registered"})


    }
    catch(err){
        res.status(500).json({message:"server error"})
        console.log(err.message)

    }
}

export const loginUser=async (req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user not found "})
        }
        const match =await bcrypt.compare(password,user.password)
        if(!match){
            return res.status(400).json({message:"invalid credintial"})
        }
        const token=jwt.sign(
        {id: user._id },process.env.JWT_SECRET,{expiresIn:"7d"}

    
    )
    res.json({message:"login successful",token,User:{
        id:user._id,
        name:user.name,
        email:user.email
    }

    })


    }
    catch(err){
         res.status(500).json({message:"server error"})
        console.log(err.message)

    }
}