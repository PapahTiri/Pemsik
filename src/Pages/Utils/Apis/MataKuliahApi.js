import AxiosInstance from "../AxiosInstance";
const API = "/matakuliah";

export const getAllMataKuliah = () => AxiosInstance.get(API);
export const addMataKuliah = (data) => AxiosInstance.post(API, data);
export const updateMataKuliah = (id, data) => AxiosInstance.put(`${API}/${id}`, data);
export const deleteMataKuliah = (id) => AxiosInstance.delete(`${API}/${id}`);
export const getMataKuliah = (id) => AxiosInstance.get(`${API}/${id}`);