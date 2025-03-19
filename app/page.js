"use client";
import { useState, useEffect } from "react";


export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTasks() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/tasks");
        const json = await res.json();
        console.log("Fetched tasks:", json);

        if (json.success) {
          setTasks(json.data);
        } else {
          setError(json.error || "Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
        setError("Failed to load tasks. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchTasks();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() }),
      });

      const json = await res.json();

      if (json.success) {
        setTasks((prev) => [json.data, ...prev]);
        setTitle("");
      } else {
        throw new Error(json.error || "Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error.message);
      setError("Failed to add task. Please try again.");
      setTimeout(() => setError(null), 3000);
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      
      const json = await res.json();
      
      if (json.success) {
        setTasks((prev) => prev.filter(task => task._id !== id));
      }
    } catch (error) {
      console.error("Error deleting task:", error.message);
      setError("Failed to delete task. Please try again.");
      setTimeout(() => setError(null), 3000);
    }
  }

  return (
    <div className='pageContainer'>
      <div className='container'>
        <header className='header'>
          <h1 className='heading'>Task Manager</h1>
          <p className=''>Keep track of your daily tasks</p>
        </header>

        {error && (
          <div className='errorMessage'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='form'>
          <div className='inputGroup'>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new task..."
              className='input'
            />
            <button 
              type="submit" 
              className='addButton'
              disabled={!title.trim()}
            >
              Add
            </button>
          </div>
        </form>

        {isLoading ? (
          <div className='loadingContainer'>
            <div className='spinner'></div>
          </div>
        ) : tasks.length > 0 ? (
          <ul className='taskList'>
            {tasks.map((task) => (
              <li 
                key={task._id} 
                className='taskItem'
              >
                <span className='taskTitle'>{task.title}</span>
                <button 
                  onClick={() => handleDelete(task._id)}
                  className='deleteButton'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className='deleteIcon' viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className='emptyState'>
            <p>No tasks yet. Add a task to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}