import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Task from "@/models/Task";

export async function GET(req, { params }) {
  await dbConnect();

  try {
    const task = await Task.findById(params.id);
    if (!task) return NextResponse.json({ message: "Task not found" }, { status: 404 });

    return NextResponse.json({ data: task }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  await dbConnect();

  try {
    const { title, completed } = await req.json();
    const updatedTask = await Task.findByIdAndUpdate(params.id, { title, completed }, { new: true });

    if (!updatedTask) return NextResponse.json({ message: "Task not found" }, { status: 404 });

    return NextResponse.json({ data: updatedTask }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();

  try {
    const deletedTask = await Task.findByIdAndDelete(params.id);
    if (!deletedTask) return NextResponse.json({ message: "Task not found" }, { status: 404 });

    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 400 });
  }
}
