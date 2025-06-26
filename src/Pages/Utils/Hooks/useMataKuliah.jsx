// File: src/Utils/Hooks/useMataKuliah.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMataKuliah,
  addMataKuliah,
  updateMataKuliah,
  deleteMataKuliah,
} from "../Apis/MataKuliahApi";
import { toastSuccess, toastError } from "../Helpers/ToastHelpers";

export const useMataKuliah = () =>
  useQuery({
    queryKey: ["mata-kuliah"],
    queryFn: getAllMataKuliah,
    select: (res) => res?.data ?? [],
  });

export const useStoreMataKuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addMataKuliah,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mata-kuliah"] });
      toastSuccess("Mata Kuliah berhasil ditambahkan!");
    },
    onError: () => toastError("Gagal menambahkan Mata Kuliah."),
  });
};

export const useUpdateMataKuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateMataKuliah(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mata-kuliah"] });
      toastSuccess("Mata Kuliah berhasil diperbarui!");
    },
    onError: () => toastError("Gagal memperbarui Mata Kuliah."),
  });
};

export const useDeleteMataKuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMataKuliah,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mata-kuliah"] });
      toastSuccess("Mata Kuliah berhasil dihapus!");
    },
    onError: () => toastError("Gagal menghapus Mata Kuliah."),
  });
};
