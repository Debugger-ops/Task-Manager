import connectDB from '@/lib/mongodb';
import Task from '@/models/Task';
import { NextResponse } from 'next/server';

// GET handler to fetch all tasks
export async function GET() {
  try {
    await connectDB();
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST handler to create a new task
export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();
    
    const task = await Task.create(body);
    return NextResponse.json({ success: true, data: task }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
