import Button from "../Layouts/Components/Button";
import Select from "../Layouts/Components/Select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllKelas,
  storeKelas,
  updateKelas,
  deleteKelas,
} from "../Utils/Apis/Kelas";
import { toastSuccess, toastError } from "../Utils/Helpers/ToastHelpers";

export const useKelas = () =>
  useQuery({
    queryKey: ["kelas"],
    queryFn: getAllKelas,
    select: (res) => res?.data ?? [],
  });

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

const TabelKelas = ({
  kelas,
  dosen,
  mahasiswa,
  mataKuliah,
  selectedDsn,
  setSelectedDsn,
  selectedMhs,
  setSelectedMhs,
  onAddMahasiswa,
  onDeleteMahasiswa,
  onChangeDosen,
  onDeleteKelas,
}) => {
  return (
    <div className="overflow-x-auto rounded-md border border-gray-200 shadow-sm">
      <table className="w-full text-sm text-left bg-white">
        <thead className="bg-gray-50 text-gray-700 font-semibold">
          <tr>
            <th className="p-3">Mata Kuliah</th>
            <th className="p-3">Dosen</th>
            <th className="p-3">Mahasiswa</th>
            <th className="p-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kelas.map((item) => {
            const matkul = mataKuliah.find((m) => m.id === item.mata_kuliah_id);
            const dosenKelas = dosen.find((d) => d.id === item.dosen_id);
            const mhsKelas = mahasiswa.filter((m) => item.mahasiswa_ids.includes(m.id));

            return (
              <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                <td className="p-3 text-gray-800">
                  {matkul?.name} <span className="text-gray-500">({matkul?.sks} SKS)</span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Select
                      value={selectedDsn[item.id] || item.dosen_id || ""}
                      onChange={(e) =>
                        setSelectedDsn((prev) => ({ ...prev, [item.id]: e.target.value }))
                      }
                      className="min-w-[150px]"
                    >
                      <option value="">Pilih Dosen</option>
                      {dosen.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </Select>
                    <Button size="sm" onClick={() => onChangeDosen(item)}>
                      Ganti
                    </Button>
                  </div>
                </td>
                <td className="p-3">
                  <ul className="space-y-1 text-gray-700">
                    {mhsKelas.map((m) => (
                      <li
                        key={m.id}
                        className="flex items-center justify-between bg-gray-100 rounded px-2 py-1"
                      >
                        <span>{m.name}</span>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => onDeleteMahasiswa(item, m.id)}
                        >
                          Hapus
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 mt-3">
                    <Select
                      value={selectedMhs[item.id] || ""}
                      onChange={(e) =>
                        setSelectedMhs((prev) => ({ ...prev, [item.id]: e.target.value }))
                      }
                      className="min-w-[150px]"
                    >
                      <option value="">Pilih Mahasiswa</option>
                      {mahasiswa.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </Select>
                    <Button
                      size="sm"
                      onClick={() => onAddMahasiswa(item, selectedMhs[item.id])}
                    >
                      Tambah
                    </Button>
                  </div>
                </td>
                <td className="p-3">
                  <Button variant="danger" onClick={() => onDeleteKelas(item.id)}>
                    Hapus Kelas
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TabelKelas;
