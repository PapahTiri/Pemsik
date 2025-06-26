import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllDosen,
  storeDosen,
  updateDosen,
  deleteDosen,
  getDosenPagination,
} from "../Apis/DosenApi";
import { toastSuccess, toastError } from "../Helpers/ToastHelpers";

// Fetch semua dosen
export const useDosen = () =>
  useQuery({
    queryKey: ["dosen"],
    queryFn: getAllDosen,
    select: (res) => res?.data ?? [],
  });

// Tambah dosen
export const useStoreDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeDosen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
      toastSuccess("Dosen berhasil ditambahkan!");
    },
    onError: () => toastError("Gagal menambahkan dosen."),
  });
};

// Edit dosen
export const useUpdateDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateDosen(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
      toastSuccess("Dosen berhasil diperbarui!");
    },
    onError: () => toastError("Gagal memperbarui dosen."),
  });
};

// Hapus dosen
export const useDeleteDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDosen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
      toastSuccess("Dosen berhasil dihapus!");
    },
    onError: () => toastError("Gagal menghapus dosen."),
  });
};

export const useDosenPaginated = ({ page, limit, keyword = "", sort = "name", order = "asc" }) =>
  useQuery({
    queryKey: ["dosen", { page, limit, keyword, sort, order }],
    queryFn: async () => {
      const res = await getDosenPagination({
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
