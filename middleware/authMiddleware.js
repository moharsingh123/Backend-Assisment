const jwt= require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const authMidleware= (req,res, next)=>{
    try {
        const authHeader= req.headers.authorization

        if(!authHeader){
            return res.status(401).json({
                message:"Authentication token required"
            });
        }
        const token= authHeader.split(" ")[1];

        const decoded= jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user= decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message:"Invalid or expire token"
        });
    }
}

module.exports= authMidleware;