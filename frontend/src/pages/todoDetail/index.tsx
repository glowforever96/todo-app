import { getTodoDetail } from "@/api/todo";
import { useAuth } from "@/store/auth-context";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function TodoDetailPage() {
  const { id } = useParams();
  const { username } = useAuth();

  useEffect(() => {
    const fetchTodo = async () => {
      if (username && id) {
        const todo = await getTodoDetail(username, Number(id));
        console.log(todo);
      }
    };
    fetchTodo();
  }, [id, username]);

  return <div>detail</div>;
}
