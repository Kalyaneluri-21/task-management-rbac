const ActivityLog = require("../models/ActivityLog");

const logActivity = async (userId, userName, action, taskId = null, taskTitle = null) => {
  try {
    await ActivityLog.create({
      user: userId,
      userName,
      action,
      task: taskId,
      taskTitle,
    });
  } catch (error) {
    console.error("Activity Log Error:", error.message);
  }
};

module.exports = logActivity;