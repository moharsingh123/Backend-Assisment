const Task= require("../models/Task");
const Project= require("../models/Project");
const User= require("../models/User");

//  create the task

const createTask= async (req, res)=>{
    try {
        const{title , description, assignedUserId , status, priority, dueDate} = req.body;

        if(!title || !description ||!dueDate){
            return res.status(400).json({
                message: "Title , description and dueDate are required"
            })
        }

        const project= await Project.findOne({
            _id:req.params.projectId,
            owner:req.user.id
        });
          if(!project){
            return res.status(400).json({
                message: "Project are not found "
            })
        }

        if(assignedUserId){

            const user= await User.findById(assignedUserId);

            if(!user){
                return res.status(400).json({
                    message: "Assigned user not found "
                });
        }
        }

        const task= await Task.create({
            title,
            description,
            projectId:project._id,
            assignedUserId: assignedUserId || null,
            status:  status|| "TODO",
            priority:priority || "MEDIUM",
            dueDate
        })

        res.status(200).json(task);


    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

// GET /api/projects/:projectId/tasks – List project tasks.


const getProjectTasks=  async(req, res)=>{
    try {
        const project= await Project.findOne({
            _id:req.params.projectId,
            owner:req.user.id
        })
        if(!project){
            return res.status(404).json({
                message: "Project are not found in the project Task"
            })            
        }
        const tasks= await Task.find({
            projectId: project._id
        })
        .populate("assignedUserId" , "name email")
        .sort({createdAt:-1})
        res.json(tasks);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


// get the Task details 
const getTask= async(req, res)=>{
    try {
        const task = await Task.findById(req.params.id)
            .populate("assignedUserId" , "name emial");
        
        if(!task){
            return res.status(404).json({
                message: "Task not found"
            })   
        }
        const project = await Project.findOne({
            _id: task.projectId,
            owner:req.user.id

        });
        if(!project){
            return res.status(404).json({
                message: "You are not authorized to view this task"
            })   
        }
        res.json(task);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });   
    }
}

// update the task 

const updateTask= async(req, res)=>{
    try {
        const task = await Task.findById(req.params.id)
            
        
        if(!task){
            return res.status(404).json({
                message: "Task not found"
            })   
        }
        const project = await Project.findOne({
            _id: task.projectId,
            owner:req.user.id

        });
        if(!project){
            return res.status(404).json({
                message: "You are not authorized to view this task"
            })   
        }
                const {
            title,
            description,
            assignedUserId,
            status,
            priority,
            dueDate
        } = req.body;

        task.title = title || task.title;
        task.description = description || task.description;
        task.assignedUserId = assignedUserId ?? task.assignedUserId;
        task.status = status || task.status;
        task.priority = priority || task.priority;
        task.dueDate = dueDate || task.dueDate;
        
        await task.save();
        res.json(task);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });   
    }
}

//  delete the task
const deleteTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const project = await Project.findOne({
            _id: task.projectId,
            owner: req.user.id
        });

        if (!project) {
            return res.status(403).json({
                message: "You are not authorized to delete this task"
            });
        }

        await Task.findByIdAndDelete(req.params.id);

        res.json({
            message: "Task deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createTask,
    getProjectTasks,
    getTask,
    updateTask,
    deleteTask
};