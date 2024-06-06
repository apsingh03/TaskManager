const router = require("express").Router();

const taskController = require("../controller/TaskController.js");
const authMiddleWare = require("../middleware/auth.js");

router.get("/task", authMiddleWare.authenticate, taskController.getTasks);
router.post("/task", authMiddleWare.authenticate, taskController.createTask);
router.put("/task", authMiddleWare.authenticate, taskController.updateTask);
router.delete(
  "/task/:taskId",
  authMiddleWare.authenticate,
  taskController.deleteTask
);

module.exports = router;
