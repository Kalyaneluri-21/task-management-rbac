const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  userName: {
    type: String,
  },

  action: {
    type: String,
    required: true,
  },

  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },

  taskTitle: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("ActivityLog", activityLogSchema);