import { api } from ".";

export const basicAuth = async (token: string) => {
  const res = await api.get("/basicauth", {
    headers: {
      Authorization: token,
    },
  });
  return res;
};
