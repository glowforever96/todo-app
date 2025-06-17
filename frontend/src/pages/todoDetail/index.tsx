import { getTodoDetail, updateTodo } from "@/api/todo";
import TodoForm, { todoSchema } from "@/components/todo-form";
import { useAuth } from "@/store/auth-context";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { z } from "zod";
import type { Todo } from "../todos";
import { format } from "date-fns";
import { toast } from "sonner";

export default function TodoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { username } = useAuth();

  const [todoDetail, setTodoDetail] = useState<Todo>();

  const handleSubmit = async (values: z.infer<typeof todoSchema>) => {
    const { targetDate, description } = values;
    if (username && id) {
      const todo = {
        id: Number(id),
        username,
        description,
        targetDate: format(targetDate, "yyyy-MM-dd"),
        done: false,
      };
      const isUpdated = await updateTodo({
        id: Number(id),
        username,
        todo,
      });
      if (isUpdated) {
        toast.success("Todo 리스트 수정 성공!");
        navigate("/todos");
      }
    }
  };

  useEffect(() => {
    const fetchTodo = async () => {
      if (username && id) {
        const todo = await getTodoDetail(username, Number(id));
        setTodoDetail(todo);
      }
    };
    fetchTodo();
  }, [id, username]);

  if (!todoDetail) return null;
  return (
    <TodoForm
      defaultValues={{
        description: todoDetail.description,
        targetDate: todoDetail.targetDate
          ? new Date(todoDetail.targetDate)
          : new Date(),
      }}
      onSubmit={handleSubmit}
    />
  );
}
