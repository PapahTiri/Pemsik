import axios from "axios";
const API = "http://localhost:3001/user";

export const registerUser = (data) => axios.post(API, data);
export const getAllUsers = () => axios.get(API);
export const updateUser = (id, data) => axios.patch(`${API}/${id}`, data);