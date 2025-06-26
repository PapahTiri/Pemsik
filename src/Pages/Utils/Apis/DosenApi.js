import axios from "axios";
const API = "http://localhost:3001/dosen";

// GET semua dosen
export const getAllDosen = () => axios.get(API);

export const getDosenPagination = (params = {}) =>
    axios.get("http://localhost:3001/dosen", { params });

// Ambil 1 dosen
export const getDosen = (id) => axios.get(`${API}/${id}`);

// Tambah dosen baru
export const storeDosen = (data) => axios.post(API, data);

// Update dosen
export const updateDosen = (id, data) => axios.put(`${API}/${id}`, data);

// Hapus dosen
export const deleteDosen = (id) => axios.delete(`${API}/${id}`);
