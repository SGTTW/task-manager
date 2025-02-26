export interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface NewTask {
  userId: number;
  title: string;
  completed: boolean;
}

const API_BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export async function fetchTasks(): Promise<Task[]> {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

export async function addTask(task: NewTask): Promise<Task> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Failed to add task");
    }
    return response.json();
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
}

export async function updateTask(task: Task): Promise<Task> {
  try {
    const response = await fetch(`${API_BASE_URL}/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    return response.json();
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}

export async function deleteTask(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    return response.json();
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}
