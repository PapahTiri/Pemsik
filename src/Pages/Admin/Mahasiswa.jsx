// File: src/Pages/Admin/Mahasiswa.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Layouts/Components/Card";
import Heading from "../Layouts/Components/Heading";
import Button from "../Layouts/Components/Button";
import TableMahasiswa from "./TableMahasiswa";
import ModalMahasiswa from "./ModalMahasiswa";
import {
  confirmDelete,
  confirmUpdate,
} from "../Utils/Helpers/SwalHelpers";
import { toastError } from "../Utils/Helpers/ToastHelpers";

import {
  useMahasiswa,
  useStoreMahasiswa,
  useUpdateMahasiswa,
  useDeleteMahasiswa,
  useMahasiswaPaginated
} from "../Utils/Hooks/useMahasiswa";
import { useKelas } from "../Utils/Hooks/useKelas";
import { useMataKuliah } from "../Utils/Hooks/useMataKuliah";

const Mahasiswa = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: "", nim: "", nama: "", max_sks: 0 });
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");

  

  // const { data: mahasiswa = [] } = useMahasiswa();
  const {
      data: result = { data: [], total: 0 },
      isLoading,
    } = useMahasiswaPaginated({
      page,
      limit: perPage,
      keyword: search,
      sort,
      order,
    });
   
  const { data: mahasiswa = [], total } = result;
  const totalPages = Math.ceil(total / perPage);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const { data: kelas = [] } = useKelas();
  const { data: mataKuliah = [] } = useMataKuliah();

  const { mutateAsync: storeMahasiswa } = useStoreMahasiswa();
  const { mutateAsync: updateMahasiswa } = useUpdateMahasiswa();
  const { mutateAsync: deleteMahasiswa } = useDeleteMahasiswa();

  const getTotalSks = (mhsId) => {
    const kelasMhs = kelas.filter((k) => k.mahasiswa_ids.includes(mhsId));
    return kelasMhs.reduce((total, k) => {
      const matkul = mataKuliah.find((m) => m.id === k.mata_kuliah_id);
      return total + (matkul?.sks || 0);
    }, 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "max_sks" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nim || !form.name || !form.max_sks) {
      toastError("NIM, Nama, dan Max SKS wajib diisi");
      return;
    }

    if (isEdit) {
      if (!form.id) {
        toastError("ID mahasiswa tidak ditemukan!");
        return;
      }
      confirmUpdate(() =>
        updateMahasiswa({ id: form.id, data: form }).then(resetForm)
      );
    } else {
      const exists = mahasiswa.find((m) => m.nim === form.nim);
      if (exists) {
        toastError("NIM sudah terdaftar!");
        return;
      }

      // filter agar id kosong tidak terkirim
      const { id, ...data } = form;
      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== null && v !== "")
      );

      await storeMahasiswa(cleanData);
      resetForm();
    }
  };

  const handleDelete = (id) => {
    confirmDelete(() => deleteMahasiswa(id));
  };

  const openAddModal = () => {
    setForm({ id: "", nim: "", name: "", max_sks: 0 });
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleEdit = (mhs) => {
    const cleanedId = String(mhs.id).replace(/^:/, "");
    setForm({
      id: cleanedId,
      nim: mhs.nim,
      nama: mhs.name,
      max_sks: mhs.max_sks,
    });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setForm({ id: "", nim: "", name: "", max_sks: 0 });
    setIsEdit(false);
    setIsModalOpen(false);
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2">Daftar Mahasiswa</Heading>
        <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
      </div>

      <TableMahasiswa
        data={mahasiswa}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
        getTotalSks={getTotalSks}
      />
      {/* Filter dan Sort */}
  <div className="flex flex-wrap gap-2 items-center mb-4">
    <input
      type="text"
      placeholder="Cari nama/NIM..."
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
            <option value="name">Sort by Nama</option>
            <option value="nim">Sort by NIM</option>
            <option value="max_sks">Sort by Max SKS</option>
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

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm">
            Halaman {page} dari {totalPages}
          </p>
          <div className="flex gap-1 items-center">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-1 rounded ${
                    page === pageNum ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <ModalMahasiswa
        isOpen={isModalOpen}
        isEdit={isEdit}
        form={form}
        onChange={handleChange}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </Card>
  );
};

export default Mahasiswa;
