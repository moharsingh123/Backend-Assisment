// POST /api/projects/:projectId/tasks – Create a task.
// GET /api/projects/:projectId/tasks – List project tasks.
// GET /api/tasks/:id – Get task details.
// PUT /api/tasks/:id – Update a task.
// DELETE /api/tasks/:id – Delete a task.

const express= require("express");
const authMiddleware= require("../middleware/authMiddleware");

const{
    createTask,
    getProjectTasks,
    getTask,
    updateTask,
    deleteTask    
}= require("../controllers/taskController");

const router= express.Router();

router.use(authMiddleware);
// create the task
router.post("/projects/:projectId/tasks" , createTask);
// get all the task
router.get("/projects/:projectId/tasks", getProjectTasks);

// get task details
router.get("/tasks/:id", getTask);

// update the task
router.put("/tasks/:id" , updateTask);

// delete the task

router.delete("/tasks/:id" , deleteTask);
module.exports= router;