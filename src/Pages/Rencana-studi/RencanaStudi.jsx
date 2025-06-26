// File: src/Pages/Admin/RencanaStudi.jsx
import { useEffect, useMemo, useState } from "react";
import Card from "../Layouts/Components/Card";
import Button from "../Layouts/Components/Button";
import ModalRencanaStudi from "./ModalRencanaStudi";
import TabelKelas from "./TabelKelas";
import { updateKelas, storeKelas, deleteKelas, getAllKelas } from "../Utils/Apis/Kelas";
import { useKelasPaginated } from "../Utils/Hooks/useKelas";

import { getAllMahasiswa } from "../../Axios/Apis/MahasiswaApi";
import { getAllDosen } from "../Utils/Apis/DosenApi";
import { getAllMataKuliah } from "../Utils/Apis/MataKuliahApi";
import { toastError, toastSuccess } from "../Utils/Helpers/ToastHelpers";
import { confirmDelete } from "../Utils/Helpers/SwalHelpers";
import { useAuth } from "../../Axios/Apis/AuthContext";

const RencanaStudi = () => {
  const { user } = useAuth();
  const [dosen, setDosen] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [mataKuliah, setMataKuliah] = useState([]);
  const [allKelas, setAllKelas] = useState([]);

  const [selectedMhs, setSelectedMhs] = useState({});
  const [selectedDsn, setSelectedDsn] = useState({});
  const [form, setForm] = useState({ mata_kuliah_id: "", dosen_id: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("nama");
  const [order, setOrder] = useState("asc");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { data: result = { data: [], total: 0 } } = useKelasPaginated({
    page,
    limit: perPage,
    keyword: search,
    sort,
    order,
    refreshTrigger,
  });

  const { data: kelas = [], total } = result;
  const totalPages = Math.ceil(total / perPage);

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  const fetchData = async () => {
    const [resKelas, resDosen, resMahasiswa, resMataKuliah] = await Promise.all([
      getAllKelas(),
      getAllDosen(),
      getAllMahasiswa(),
      getAllMataKuliah(),
    ]);
    setAllKelas(resKelas.data);
    setDosen(resDosen.data);
    setMahasiswa(resMahasiswa.data);
    setMataKuliah(resMataKuliah.data);
  };

  const mataKuliahSudahDipakai = useMemo(
    () => allKelas.map((k) => k.mata_kuliah_id),
    [allKelas]
  );

  const mataKuliahBelumAdaKelas = useMemo(
    () => mataKuliah.filter((m) => !mataKuliahSudahDipakai.includes(m.id)),
    [mataKuliah, mataKuliahSudahDipakai]
  );

  const getMaxSks = (id) => mahasiswa.find((m) => m.id === id)?.max_sks || 0;
  const getDosenMaxSks = (id) => dosen.find((d) => d.id === id)?.max_sks || 0;

  const handleAddMahasiswa = async (kelasItem, mhsId) => {
    const matkul = mataKuliah.find((m) => m.id === kelasItem.mata_kuliah_id);
    const sks = matkul?.sks || 0;
    const totalSksMahasiswa = allKelas
      .filter((k) => k.mahasiswa_ids.includes(mhsId))
      .map((k) => mataKuliah.find((m) => m.id === k.mata_kuliah_id)?.sks || 0)
      .reduce((acc, curr) => acc + curr, 0);

    const maxSks = getMaxSks(mhsId);
    if (totalSksMahasiswa + sks > maxSks) {
      toastError(`SKS melebihi batas maksimal (${maxSks})`);
      return;
    }

    if (kelasItem.mahasiswa_ids.includes(mhsId)) {
      toastError("Mahasiswa sudah terdaftar");
      return;
    }

    const updated = {
      ...kelasItem,
      mahasiswa_ids: [...kelasItem.mahasiswa_ids, mhsId],
    };

    await updateKelas(kelasItem.id, updated);
    toastSuccess("Mahasiswa ditambahkan");
    setSelectedMhs((prev) => ({ ...prev, [kelasItem.id]: "" }));
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleDeleteMahasiswa = async (kelasItem, mhsId) => {
    const updated = {
      ...kelasItem,
      mahasiswa_ids: kelasItem.mahasiswa_ids.filter((id) => id !== mhsId),
    };

    await updateKelas(kelasItem.id, updated);
    toastSuccess("Mahasiswa dihapus");
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleChangeDosen = async (kelasItem) => {
    const dsnId = selectedDsn[kelasItem.id];
    if (!dsnId) return;

    const totalSksDosen = allKelas
      .filter((k) => k.dosen_id === dsnId)
      .map((k) => mataKuliah.find((m) => m.id === k.mata_kuliah_id)?.sks || 0)
      .reduce((acc, curr) => acc + curr, 0);

    const kelasSks = mataKuliah.find((m) => m.id === kelasItem.mata_kuliah_id)?.sks || 0;
    const maxSks = getDosenMaxSks(dsnId);

    if (totalSksDosen + kelasSks > maxSks) {
      toastError(`Dosen melebihi batas maksimal SKS (${maxSks})`);
      return;
    }

    await updateKelas(kelasItem.id, { ...kelasItem, dosen_id: dsnId });
    toastSuccess("Dosen diperbarui");
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleDeleteKelas = async (kelasId) => {
    confirmDelete(async () => {
      await deleteKelas(kelasId);
      toastSuccess("Kelas dihapus");
      setRefreshTrigger((prev) => prev + 1);
    });
  };

  const openAddModal = () => {
    setForm({ mata_kuliah_id: "", dosen_id: "" });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.mata_kuliah_id || !form.dosen_id) {
      toastError("Form tidak lengkap");
      return;
    }
    await storeKelas({ ...form, mahasiswa_ids: [] });
    setIsModalOpen(false);
    toastSuccess("Kelas ditambahkan");
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Card>
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-semibold">Rencana Studi</h1>
          {user?.permission?.includes("rencana-studi.page") && (
            <Button onClick={openAddModal}>+ Tambah Kelas</Button>
          )}
        </div>

        <TabelKelas
          kelas={kelas}
          dosen={dosen}
          mahasiswa={mahasiswa}
          mataKuliah={mataKuliah}
          selectedDsn={selectedDsn}
          setSelectedDsn={setSelectedDsn}
          selectedMhs={selectedMhs}
          setSelectedMhs={setSelectedMhs}
          onAddMahasiswa={handleAddMahasiswa}
          onDeleteMahasiswa={handleDeleteMahasiswa}
          onChangeDosen={handleChangeDosen}
          onDeleteKelas={handleDeleteKelas}
        />
      </Card>

      {/* Filter & Pagination */}
      <div className="flex flex-wrap gap-2 my-4">
        <input
          type="text"
          placeholder="Cari kelas..."
          className="border px-3 py-1 rounded flex-grow"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-1 rounded"
        >
          <option value="nama">Sort by Nama</option>
        </select>
        <select
          value={order}
          onChange={(e) => {
            setOrder(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-1 rounded"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <select
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setPage(1);
          }}
          className="border px-3 py-1 rounded"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm">Halaman {page} dari {totalPages}</p>
        <div className="flex gap-1">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <ModalRencanaStudi
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        form={form}
        onChange={handleChange}
        mataKuliah={mataKuliahBelumAdaKelas}
        dosen={dosen}
      />
    </>
  );
};

export default RencanaStudi;
