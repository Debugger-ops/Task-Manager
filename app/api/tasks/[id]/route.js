import { NextResponse } from "next/server";
import Task from "@/models/Task";
import connectDB from "@/lib/mongodb";

// GET a single task
export async function GET(_, context) {
  try {
    await connectDB();
    
    const params = await context.params; // Await params properly
    if (!params?.id) {
      return NextResponse.json({ message: "Invalid task ID" }, { status: 400 });
    }

    const task = await Task.findById(params.id);
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// UPDATE a task
export async function PUT(request, context) {
  try {
    await connectDB();

    const params = await context.params; // Await params properly
    if (!params?.id) {
      return NextResponse.json({ message: "Invalid task ID" }, { status: 400 });
    }

    const { title, completed } = await request.json();
    const updatedTask = await Task.findByIdAndUpdate(
      params.id,
      { title, completed },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// DELETE a task
export async function DELETE(request, context) {
  try {
    await connectDB();

    const params = await context.params; // Await params properly
    if (!params?.id) {
      return NextResponse.json({ message: "Invalid task ID" }, { status: 400 });
    }

    const deletedTask = await Task.findByIdAndDelete(params.id);
    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
