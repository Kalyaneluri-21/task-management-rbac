const User = require("../models/User");
const Task = require("../models/Task");
const ActivityLog = require("../models/ActivityLog");
const logActivity = require("../utils/logActivity");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: "User",
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await Task.deleteMany({
      createdBy: deletedUser._id,
    });

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("createdBy", "name email role");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteAnyTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await logActivity(req.user.userId, req.user.name, "ADMIN_DELETED_TASK", deletedTask._id, deletedTask.title);

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate("user", "name email")
      .populate("task", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({
      role: "User",
    });

    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });

    const pendingTasks = await Task.countDocuments({
      status: "Pending",
    });

    res.status(200).json({
      totalUsers,
      totalTasks,
      completedTasks,
      pendingTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  updateUserStatus,
  deleteUser,
  getAllTasks,
  deleteAnyTask,
  getActivityLogs,
  getAnalytics,
};
