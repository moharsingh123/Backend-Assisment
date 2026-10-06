const express= require("express");

const {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject
}= require("../controllers/projectController");
const authMiddleware= require("../middleware/authMiddleware");
const router= express.Router();

router.use(authMiddleware)

router.post("/" , createProject);
router.get("/" , getProjects);
router.get("/:id" , getProject);
router.put("/:id" ,authMiddleware, updateProject);
router.delete("/:id" , deleteProject);


module.exports= router;