import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function TodoList() {
  const today = new Date();

  const todos = [
    { id: 1, description: "리액트 배우기", isDone: false, targetDate: today },
    { id: 2, description: "스프링 배우기", isDone: false, targetDate: today },
    { id: 3, description: "devOps 배우기", isDone: false, targetDate: today },
    { id: 4, description: "그냥 배우기", isDone: false, targetDate: today },
  ];

  return (
    <Table className="text-base ">
      <TableHeader>
        <TableRow className="text-md h-14">
          <TableHead>ID</TableHead>
          <TableHead>할 일</TableHead>
          <TableHead>완료</TableHead>
          <TableHead>목표 날짜</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map(({ id, description, isDone, targetDate }) => (
          <TableRow key={id}>
            <TableCell>{id}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>{isDone ? "✅" : "❌"}</TableCell>
            <TableCell>{targetDate.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
