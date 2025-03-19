import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export default Task;
