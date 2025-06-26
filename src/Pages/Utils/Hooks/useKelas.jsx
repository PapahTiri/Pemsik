// File: src/Utils/Hooks/useKelas.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllKelas,
  storeKelas,
  updateKelas,
  deleteKelas,
  getAllKelasPagination,
} from "../../Utils/Apis/Kelas";
import { toastSuccess, toastError } from "../Helpers/ToastHelpers";

// Ambil semua kelas
export const useKelas = () =>
  useQuery({
    queryKey: ["kelas"],
    queryFn: getAllKelas,
    select: (res) => res?.data ?? [],
  });

// Tambah kelas
export const useStoreKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeKelas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
      toastSuccess("Kelas berhasil ditambahkan!");
    },
    onError: () => toastError("Gagal menambahkan kelas."),
  });
};

// Update kelas
export const useUpdateKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateKelas(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
      toastSuccess("Kelas berhasil diperbarui!");
    },
    onError: () => toastError("Gagal memperbarui kelas."),
  });
};

// Hapus kelas
export const useDeleteKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteKelas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
      toastSuccess("Kelas berhasil dihapus!");
    },
    onError: () => toastError("Gagal menghapus kelas."),
  });
};

export const useKelasPaginated = ({ page, limit, keyword = "", sort = "nama", order = "asc" }) =>
  useQuery({
    queryKey: ["kelas", { page, limit, keyword, sort, order }],
    queryFn: async () => {
      const res = await getAllKelasPagination( {
        params: {
          _page: page,
          _limit: limit,
          _sort: sort,
          _order: order,
          q: keyword,
        },
      });

      return {
        data: res.data,
        total: parseInt(res.headers["x-total-count"]),
      };
    },
    keepPreviousData: true,
  });
