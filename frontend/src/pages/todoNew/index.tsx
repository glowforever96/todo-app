import { addTodo } from "@/api/todo";
import TodoForm, { todoSchema } from "@/components/todo-form";
import { useAuth } from "@/store/auth-context";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { z } from "zod";

export default function TodoNewPage() {
  const { username } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: z.infer<typeof todoSchema>) => {
    const { targetDate, description } = values;
    if (username) {
      const todo = {
        username,
        description,
        targetDate: format(targetDate, "yyyy-MM-dd"),
        done: false,
      };
      const isSuccess = await addTodo({
        username,
        todo,
      });
      if (isSuccess) {
        toast.success("Todo 리스트 생성 성공!");
        navigate("/todos");
      }
    }
  };
  return <TodoForm onSubmit={handleSubmit} />;
}
