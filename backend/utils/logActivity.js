const ActivityLog = require("../models/ActivityLog");

const logActivity = async (userId, action, taskId = null) => {
  try {
    await ActivityLog.create({
      user: userId,
      action,
      task: taskId,
    });
  } catch (error) {
    console.error("Activity Log Error:", error.message);
  }
};

module.exports = logActivity;