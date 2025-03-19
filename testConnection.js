const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://taskDb:task.10@cluster0.qygld.mongodb.net/taskmanager?retryWrites=true&w=majority";

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log("✅ Successfully connected to MongoDB!");
  } catch (error) {
    console.error("⛔ MongoDB connection failed:", error);
  } finally {
    mongoose.connection.close();
  }
}

testConnection();
