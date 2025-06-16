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
