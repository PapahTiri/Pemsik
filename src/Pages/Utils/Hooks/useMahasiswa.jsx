import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMahasiswa,
  storeMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "../../../Axios/Apis/MahasiswaApi";

import { getAllMahasiswaPagination } from "../Apis/MahasiswaApi";
import { toastSuccess, toastError } from "../Helpers/ToastHelpers";

// Ambil semua mahasiswa
export const useMahasiswa = () =>
  useQuery({
    queryKey: ["mahasiswa"],
    queryFn: getAllMahasiswa,
    select: (res) => res?.data ?? [],
  });

// Tambah
export const useStoreMahasiswa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeMahasiswa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
      toastSuccess("Mahasiswa berhasil ditambahkan!");
    },
    onError: () => toastError("Gagal menambahkan mahasiswa."),
  });
};

// Edit
export const useUpdateMahasiswa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateMahasiswa(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
      toastSuccess("Mahasiswa berhasil diperbarui!");
    },
    onError: () => toastError("Gagal memperbarui mahasiswa."),
  });
};

// Hapus
export const useDeleteMahasiswa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMahasiswa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
      toastSuccess("Mahasiswa berhasil dihapus!");
    },
    onError: () => toastError("Gagal menghapus mahasiswa."),
  });
};

export const useMahasiswaPaginated = ({ page, limit, keyword = "", sort = "name", order = "asc" }) =>
  useQuery({
    queryKey: ["mahasiswa", { page, limit, keyword, sort, order }],
    queryFn: async () => {
      const res = await getAllMahasiswaPagination({
        _page: page,
        _limit: limit,
        _sort: sort,
        _order: order,
        q: keyword,
      });

      return {
        data: res.data,
        total: parseInt(res.headers["x-total-count"]),
      };
    },
    keepPreviousData: true,
  });