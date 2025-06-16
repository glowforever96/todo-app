import type { Todo } from "@/pages/todos";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { deleteTodo } from "@/api/todo";
import { useAuth } from "@/store/auth-context";
import { useNavigate } from "react-router-dom";

export default function TodoList({
  todos,
  refreshTodos,
}: {
  todos: Todo[];
  refreshTodos: () => Promise<void>;
}) {
  const { username } = useAuth();
  const navigate = useNavigate();

  const handleClickDeleteButton = async (id: number) => {
    await deleteTodo(username as string, id);
    await refreshTodos();
  };

  const handleClickUpdateButton = (id: number) => {
    navigate(`/todos/${id}`);
  };

  return (
    <Table className="text-base ">
      <TableHeader>
        <TableRow className="text-md h-14">
          <TableHead>할 일</TableHead>
          <TableHead>완료</TableHead>
          <TableHead>목표 날짜</TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos?.map(({ id, description, isDone, targetDate }) => (
          <TableRow key={id}>
            <TableCell>{description}</TableCell>
            <TableCell>{isDone ? "✅" : "❌"}</TableCell>
            <TableCell>{targetDate.toLocaleString()}</TableCell>
            <TableCell>
              <Button
                className="cursor-pointer"
                variant="secondary"
                onClick={() => handleClickDeleteButton(id)}
              >
                삭제
              </Button>
            </TableCell>
            <TableCell>
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => handleClickUpdateButton(id)}
              >
                수정
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
