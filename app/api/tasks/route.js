import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Task from "@/models/Task";

export async function GET() {
  await dbConnect();

  try {
    const tasks = await Task.find({});
    return NextResponse.json({ data: tasks }, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();
  
  try {
    const { title } = await req.json();
    if (!title) return NextResponse.json({ message: "Title is required" }, { status: 400 });

    const newTask = await Task.create({ title });
    return NextResponse.json({ data: newTask }, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ message: "Failed to create task" }, { status: 500 });
  }
}
