import axios from "../AxiosInstance";

// Ambil semua kelas
export const getAllKelas = () => axios.get("/kelas");

export const getAllKelasPagination = (params = {}) =>
    axios.get("/kelas", { params });

// Ambil 1 kelas
export const getKelas = (id) => axios.get(`/kelas/${id}`);

// Tambah kelas baru
export const storeKelas = (data) => axios.post("/kelas", data);

// Update kelas
export const updateKelas = (id, data) => axios.put(`/kelas/${id}`, data);

// Hapus kelas
export const deleteKelas = (id) => axios.delete(`/kelas/${id}`);