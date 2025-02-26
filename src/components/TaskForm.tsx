"use client";

import { useState, useEffect } from "react";
import {
  Task,
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
} from "@/services/api";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";

export default function TaskContainer() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchTasks();
      // Limit to first 10 tasks for better performance
      setTasks(data.slice(0, 10));
    } catch (err) {
      setError("Failed to load tasks. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (title: string) => {
    if (!title.trim()) return;

    try {
      setIsSubmitting(true);
      setError(null);
      const newTask = await addTask({
        userId: 1,
        title,
        completed: false,
      });

      setTasks([newTask, ...tasks]);
    } catch (err) {
      setError("Failed to add task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      setError(null);
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(updatedTask);

      // Update local state
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
    } catch (err) {
      setError("Failed to update task. Please try again.");
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      setError(null);
      await deleteTask(id);

      // Update local state
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError("Failed to delete task. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <TaskForm onAddTask={handleAddTask} isSubmitting={isSubmitting} />

      {error && <ErrorMessage message={error} />}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
}
