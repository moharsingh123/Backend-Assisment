const express= require("express");

const mongoose= require("mongoose");

const cors= require("cors");
require("dotenv").config();

const authRoutes= require("./routes/authRoutes");
const projectRoutes= require("./routes/projectRoutes");
const taskRoutes= require("./routes/taskRoutes");

const app= express();

app.use(cors());
app.use(express.json());

app.use("/api/auth" , authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", taskRoutes);

app.get("/" , (req,res)=>{
    res.json({message: "Task Management API  is Running "})
})

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("MongoDB connected");

        app.listen(process.env.PORT , ()=>{
            console.log("Server is running");
        });
    })
    .catch((error)=>{
        console.log("MongoDB connection error:" , error);
    })