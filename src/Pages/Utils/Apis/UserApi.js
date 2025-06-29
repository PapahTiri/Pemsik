import AxiosInstance from "../AxiosInstance";
const API = "/user";

export const registerUser = (data) => AxiosInstance.post(API, data);
export const getAllUsers = () => AxiosInstance.get(API);
export const updateUser = (id, data) => AxiosInstance.put(`${API}/${id}`, data);