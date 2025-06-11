import TodoList from "@/components/todo-list";
import { useEffect } from "react";
import axios from "axios";

export default function TodoPage() {
  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await axios.get("http://localhost:8080/todos");
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTodos();
  }, []);
  return <TodoList />;
}
