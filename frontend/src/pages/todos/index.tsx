import TodoList from "@/components/todo-list";
import { useCallback, useEffect, useState } from "react";

import { getTodos } from "@/api/todo";
import { useAuth } from "@/store/auth-context";

export interface Todo {
  id: number;
  username: string;
  description: string;
  targetDate: string;
  isDone: boolean;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { username } = useAuth();

  const fetchTodos = useCallback(async () => {
    if (username) {
      const todos = await getTodos(username);
      setTodos(todos);
    }
  }, [username]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return <TodoList todos={todos} refreshTodos={fetchTodos} />;
}
