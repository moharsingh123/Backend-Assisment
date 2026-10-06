const mongoose= require("mongoose");

const taskSchema= new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:true
        },
        projectId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Project",
            required:true,
        },
        assignedUserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default: null,
        },
        status:{
            type:String,
            enum:["TODO", "IN_PROGRESS" , "COMPLETED"],
            default:"TODO",

        },
        priority: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH"],
            default: "MEDIUM"
        },

        dueDate: {
            type: Date,
            required: true
        }


    },
    {
        timestamps:true
    }
)

module.exports= mongoose.model("Task", taskSchema);