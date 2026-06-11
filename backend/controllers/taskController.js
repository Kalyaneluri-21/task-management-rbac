const Task = require("../models/Task");
const logActivity = require("../utils/logActivity");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      createdBy: req.user.userId,
    });

    await logActivity(req.user.userId, "TASK_CREATED", task._id);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      createdBy: req.user.userId,
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.userId,
      },
      req.body,
      { new: true },
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await logActivity(req.user.userId, "TASK_UPDATED", updatedTask._id);

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await logActivity(req.user.userId, "TASK_DELETED", deletedTask._id);

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
};
