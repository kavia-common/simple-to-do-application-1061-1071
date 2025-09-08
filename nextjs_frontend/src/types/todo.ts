//
// PUBLIC INTERFACE
// Types for Todo data model and API contracts inspired by backend OpenAPI
//

// PUBLIC_INTERFACE
export type TodoStatus = "pending" | "in_progress" | "completed";

// PUBLIC_INTERFACE
export type TodoPriority = "low" | "medium" | "high";

// PUBLIC_INTERFACE
export interface Todo {
  /** MongoDB ObjectId as string */
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  status?: TodoStatus;
  dueDate?: string; // ISO string
  priority?: TodoPriority;
  tags?: string[];
  followersCount?: number;
  followingCount?: number;
  publicationsCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

// PUBLIC_INTERFACE
export interface ListTodosParams {
  completed?: boolean;
  status?: TodoStatus;
  tag?: string;
  q?: string;
  limit?: number;
  offset?: number;
}

// PUBLIC_INTERFACE
export interface CreateTodoBody {
  title: string;
  description?: string;
  completed?: boolean;
  status?: TodoStatus;
  dueDate?: string;
  priority?: TodoPriority;
  tags?: string[];
}

// PUBLIC_INTERFACE
export type UpdateTodoBody = Partial<CreateTodoBody>;
