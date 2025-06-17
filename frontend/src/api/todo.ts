import type { Todo } from "@/pages/todos";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getTodos = async (username: string) => {
  try {
    const res = await api.get(`/users/${username}/todos`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteTodo = async (username: string, id: number) => {
  try {
    const res = await api.delete(`/users/${username}/todos/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getTodoDetail = async (username: string, id: number) => {
  try {
    const res = await api.get(`/users/${username}/todos/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateTodo = async ({
  username,
  id,
  todo,
}: {
  username: string;
  id: number;
  todo: Todo;
}) => {
  try {
    const res = await api.put(`/users/${username}/todos/${id}`, todo);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const addTodo = async ({
  username,
  todo,
}: {
  username: string;
  todo: Todo;
}) => {
  try {
    const res = await api.post(`/users/${username}/todos`, todo);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
