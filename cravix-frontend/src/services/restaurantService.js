import api from "../api/axios";

export const getRestaurants = async () => {
  const response = await api.get("/restaurants");
  return response.data;
};