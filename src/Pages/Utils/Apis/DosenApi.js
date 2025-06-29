import AxiosInstance from "../AxiosInstance";
const API = "/dosen";

// GET semua dosen
export const getAllDosen = () => AxiosInstance.get(API);

export const getDosenPagination = (params = {}) =>
    AxiosInstance.get(API, { params });

// Ambil 1 dosen
export const getDosen = (id) => AxiosInstance.get(`${API}/${id}`);

// Tambah dosen baru
export const storeDosen = (data) => AxiosInstance.post(API, data);

// Update dosen
export const updateDosen = (id, data) => AxiosInstance.put(`${API}/${id}`, data);

// Hapus dosen
export const deleteDosen = (id) => AxiosInstance.delete(`${API}/${id}`);