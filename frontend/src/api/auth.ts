import { api } from ".";

export const basicAuth = async (token: string) => {
  const res = await api.get("/basicauth", {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const jwtAuth = async (username: string, password: string) => {
  const res = await api.post("/authenticate", {
    username,
    password,
  });
  console.log(res);
  return res;
};
