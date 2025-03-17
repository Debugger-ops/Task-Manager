import connectDB from '@/lib/mongodb';
import Task from '@/models/Task';
import { NextResponse } from 'next/server';

// Helper function to get a task by ID
async function getTaskById(id) {
  await connectDB();
  const task = await Task.findById(id);
  if (!task) {
    throw new Error('Task not found');
  }
  return task;
}

// GET handler to fetch single task
export async function GET(request, { params }) {
  try {
    const task = await getTaskById(params.id);
    return NextResponse.json({ success: true, data: task }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: error.message === 'Task not found' ? 404 : 500 });
  }
}

// PUT handler to update a task
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    await connectDB();
    
    const updatedTask = await Task.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!updatedTask) {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: updatedTask }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE handler to remove a task
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const deletedTask = await Task.findByIdAndDelete(params.id);
    
    if (!deletedTask) {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
