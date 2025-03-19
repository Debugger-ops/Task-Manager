import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
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
