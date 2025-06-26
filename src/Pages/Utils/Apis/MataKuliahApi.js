import axios from "axios";
const API = "http://localhost:3001/matakuliah";

export const getAllMataKuliah = () => axios.get(API);
export const addMataKuliah = (data) => axios.post(API, data);
export const updateMataKuliah = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteMataKuliah = (id) => axios.delete(`${API}/${id}`);
export const getMataKuliah = (id) => axios.get(`${API}/${id}`);
