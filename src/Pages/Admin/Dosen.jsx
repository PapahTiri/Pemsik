// File: src/Pages/Admin/Dosen.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Layouts/Components/Card";
import Heading from "../Layouts/Components/Heading";
import Button from "../Layouts/Components/Button";
import ModalDosen from "./ModalDosen";
import TableDosen from "./TabelDosen";
import {
  confirmDelete,
  confirmUpdate,
} from "../Utils/Helpers/SwalHelpers";
import { toastError } from "../Utils/Helpers/ToastHelpers";

import {
  useDosen,
  useStoreDosen,
  useUpdateDosen,
  useDeleteDosen,
  useDosenPaginated,
} from "../Utils/Hooks/useDosen";

const Dosen = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: "", name: "", max_sks: 0 });
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync: storeDosen } = useStoreDosen();
  const { mutateAsync: updateDosen } = useUpdateDosen();
  const { mutateAsync: deleteDosen } = useDeleteDosen();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const {
    data: result = { data: [], total: 0 },
    isLoading,
  } = useDosenPaginated({
    page,
    limit: perPage,
    keyword: search,
    sort,
    order,
  });

const { data: dosen = [], total } = result;
const totalPages = Math.ceil(total / perPage);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.name === "max_sks" ? parseInt(e.target.value) : e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.max_sks) {
      toastError("Nama dan Max SKS wajib diisi!");
      return;
    }

    if (isEdit) {
      confirmUpdate(() =>
        updateDosen({ id: form.id, data: form }).then(resetForm)
      );
    } else {
      const exists = dosen.find((d) => d.name === form.name);
      if (exists) {
        toastError("Nama dosen sudah ada");
        return;
      }
      const { id, ...data } = form;
      await storeDosen(data);
      resetForm();
    }
  };

  const handleDelete = (id) => {
    confirmDelete(() => deleteDosen(id));
  };

  const resetForm = () => {
    setForm({ id: "", name: "", max_sks: 0 });
    setIsEdit(false);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setIsModalOpen(true);
    setForm({ name: "", max_sks: 0 });
    setIsEdit(false);
  };

  const handleEdit = (dsn) => {
    setForm({ id: dsn.id, name: dsn.name, max_sks: dsn.max_sks });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2">Daftar Dosen</Heading>
        <Button onClick={openAddModal}>+ Tambah Dosen</Button>
      </div>

      <TableDosen
        data={dosen}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetail={(id) => navigate(`/admin/dosen/${id}`)}
      />
      <div className="flex flex-wrap gap-2 items-center my-4">
  <input
    type="text"
    placeholder="Cari nama dosen..."
    className="border px-3 py-1 rounded"
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
    <div className="flex justify-between items-center mt-4">
    <p className="text-sm">
      Halaman {page} dari {totalPages}
    </p>
    <div className="flex gap-1 items-center">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
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
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>

      <ModalDosen
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

export default Dosen;
