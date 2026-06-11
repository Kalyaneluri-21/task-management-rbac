const express = require("express");

const {
  getAllUsers,
  updateUserStatus,
  deleteUser,
  getAllTasks,
  deleteAnyTask,
  getActivityLogs,
  getAnalytics,
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const router = express.Router();

router.use(protect, isAdmin);

router.get("/users", getAllUsers);
router.patch("/users/:id/status", updateUserStatus);
router.delete("/users/:id", deleteUser);

router.get("/tasks", getAllTasks);
router.delete("/tasks/:id", deleteAnyTask);

router.get("/logs", getActivityLogs);

router.get("/analytics", getAnalytics);

module.exports = router;