import dbConnect from "@/lib/mongodb";
import Task from "@/models/Task";

export async function GET(req) {
  try {
    await dbConnect();
    const tasks = await Task.find();
    return new Response(JSON.stringify({ success: true, data: tasks }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const { title } = await req.json();

    if (!title) {
      return new Response(JSON.stringify({ success: false, error: "Title is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newTask = new Task({ title });
    await newTask.save();

    return new Response(JSON.stringify({ success: true, data: newTask }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  
}
