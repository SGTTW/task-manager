"use client";

import { Task } from "@/services/api";
import { useState } from "react";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (task: Task) => Promise<void>;
  onDeleteTask: (id: number) => Promise<void>;
}

export default function TaskItem({
  task,
  onToggleComplete,
  onDeleteTask,
}: TaskItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async () => {
    try {
      setIsUpdating(true);
      await onToggleComplete(task);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDeleteTask(task.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <li
      className={`
        flex items-center justify-between p-3 border rounded-md
        ${task.completed ? "bg-gray-50" : "bg-white"}
        ${isUpdating || isDeleting ? "opacity-70" : ""}
      `}
    >
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          disabled={isUpdating || isDeleting}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          aria-label={`Mark "${task.title}" as ${
            task.completed ? "incomplete" : "complete"
          }`}
        />
        <span
          className={`text-gray-800 ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.title}
        </span>
      </div>
      <button
        onClick={handleDelete}
        disabled={isUpdating || isDeleting}
        className="ml-2 p-1.5 text-red-500 hover:bg-red-50 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label={`Delete "${task.title}"`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </li>
  );
}
