import TodoList from "@/components/todo-list";
import { useCallback, useEffect, useState } from "react";

import { getTodos, updateDone } from "@/api/todo";
import { useAuth } from "@/store/auth-context";
import { toast } from "sonner";

export interface Todo {
  id?: number;
  username: string;
  description: string;
  targetDate: string;
  done: boolean;
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

  const toggleDone = async (todoId: number) => {
    const prevTodos = [...todos];
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);

    try {
      await updateDone(username as string, todoId);
    } catch (err) {
      if (err instanceof Error) {
        setTodos(prevTodos);
        toast.error("완료 여부 갱신에 실패했습니다.", {
          description: "다시 시도 해주세요.",
        });
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <TodoList todos={todos} refreshTodos={fetchTodos} toggleDone={toggleDone} />
  );
}
