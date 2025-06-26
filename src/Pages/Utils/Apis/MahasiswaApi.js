import axios from "../AxiosInstance";

export const getAllMahasiswaPagination = (params = {}) =>
    axios.get("/mahasiswa", { params });

export const getMahasiswa = (id) =>
  axios.get(`/mahasiswa/${id}`);