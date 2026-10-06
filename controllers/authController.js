
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");
const User= require("../models/User");

const register= async(req, res)=>{
    try {
        const {name, email, password}= req.body;

        if(!name || !email|| !password){
            return res.status(409).json({
                message:"All the fields are required"
            })
        }

        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                message:"User is already registered"
            })
        }
        const hashpasword= await bcrypt.hash(password, 10);

        const user= await User.create({
            name, email,password:hashpasword
        })

        res.status(200).json({
            message:"User registered successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}


//  login controller

const login = async(req, res)=>{
    try {
        const {email, password}= req.body;

        const user= await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"Invalid email "
            });
        }
        const isMatch=  await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({
                message:"Invalid password"
            })
        }

        const token= jwt.sign(
            {
                id:user._id,
                email:user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
        )
        res.json({
            message:"Login successful",
            token
        });
    } catch (error) {
        res.status(500).json({
            message:error.message
            
        });        
    }
}


module.exports= {register, login}