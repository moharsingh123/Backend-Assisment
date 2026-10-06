const Project = require("../models/Project");

const createProject= async(req, res)=>{
    try {
        const {title , description} = req.body;
        //  agar title and description is not provide by frontend
        if(!title || !description){
            return res.status(400).json({
                message:"Title and description are required"
            })
        }
        const project = await Project.create({
            title,
            description,
            owner:req.user.id
        })


        res.status(201).json({project})
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

//  get all project is asseccable 

// Get all projects accessible to the logged-in user.
const getProjects= async(req, res)=>{
    try {
        const project= await Project.find({
            owner:req.user.id
        }).populate("owner" , "name email");

        res.json(project)

    } catch (error) {
              return   res.status(500).json({
            message:error.message
        })
    }
}


// Get project details.

const getProject= async(req, res)=>{
    try {
        const project= await Project.findOne({
            _id: req.params.id,   
            owner:req.user.id   //logged-in user
        }).populate("owner" , "name email");
        if(!project){
            return res.status(404).json({
                message:"Project details are not found "
            })
        }
        res.json(project)
    } catch (error) {
        return   res.status(500).json({
            message:error.message
        })        
    }
}

//  Update project


const updateProject= async(req, res)=>{
    try {
        const {title , description}= req.body; 
        const project= await Project.findOne({
            _id: req.params.id,   
            owner:req.user.id   //logged-in user
        })
        if(!project){
            return res.status(404).json({
                message:"Project details are not found "
            })
        }
        project.title=  title|| project.title;
        project.description = description|| project.description

        await project.save();

        res.json(project)
    } catch (error) {
        return   res.status(500).json({
            message:error.message
        })        
    }


}

//  delete the project

const deleteProject= async(req, res)=>{
    try {
        const project= await Project.findOneAndDelete({
            _id: req.params.id,   
            owner:req.user.id   //logged-in user
        })
        if(!project){
            return res.status(404).json({
                message:"Project details are not found "
            })
        }
        res.json({message: "Project deleted successfully"})
    } catch (error) {
        return   res.status(500).json({
            message:error.message
        })        
    }
}


module.exports={createProject,getProjects, getProject, updateProject, deleteProject}