import { useEffect, useState } from "react";
import { getAllUsers, updateUser } from "../Utils/Apis/UserApi";
import { toastSuccess, toastError } from "../Utils/Helpers/ToastHelpers";
import  Button  from "../Layouts/Components/Button";
 
const allPermissions = [
  "dashboard.page",
  "mahasiswa.page",
  "mahasiswa.read",
  "mahasiswa.create",
  "mahasiswa.update",
  "mahasiswa.delete",
  "krs.page",
  "krs.read"
];

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ role: "", permission: [] });

  useEffect(() => {
    getAllUsers().then(res => setUsers(res.data));
  }, []);

  const handleEdit = (user) => {
    setEditing(user.id);
    setForm({ role: user.role || "", permission: user.permission || [] });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePermission = (perm) => {
    setForm((prev) => ({
      ...prev,
      permission: prev.permission.includes(perm)
        ? prev.permission.filter(p => p !== perm)
        : [...prev.permission, perm]
    }));
  };

const handleSave = async () => {
  try {
    await updateUser(editing, form);
    toastSuccess("User berhasil diupdate");

    // ✅ Jika user yang diedit adalah user yang sedang login
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (String(currentUser?.id) === String(editing)) {
      const updatedUser = { ...currentUser, ...form };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.location.reload(); // ⬅️ paksa reload agar AuthContext re-read
    }

    setEditing(null);
    const updated = await getAllUsers();
    setUsers(updated.data);
  } catch {
    toastError("Gagal update user");
  }
};

  return (
    <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Role & Permission</h1>

        {users.map((user) => (
        <div key={user.id} className="border border-gray-300 rounded-xl p-5 shadow-sm space-y-3 bg-white">
            <div>
            <p className="text-gray-700"><span className="font-medium">Nama:</span> {user.name}</p>
            <p className="text-gray-700"><span className="font-medium">Email:</span> {user.email}</p>
            </div>

            {editing === user.id ? (
            <>
                <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Role:</label>
                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">- pilih -</option>
                    <option value="admin">Admin</option>
                    <option value="mahasiswa">Mahasiswa</option>
                    <option value="dosen">Dosen</option>
                </select>
                </div>

                <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-1">Permissions:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {allPermissions.map((perm) => (
                    <label key={perm} className="text-sm text-gray-600 flex items-center gap-2">
                        <input
                        type="checkbox"
                        checked={form.permission.includes(perm)}
                        onChange={() => togglePermission(perm)}
                        className="accent-blue-600"
                        />
                        {perm}
                    </label>
                    ))}
                </div>
                </div>

                <button
                onClick={handleSave}
                className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
                >
                Simpan
                </button>
            </>
            ) : (
            <>
                <p className="text-gray-700">
                <span className="font-medium">Role:</span> {user.role || "-"}
                </p>
                <p className="text-gray-700">
                <span className="font-medium">Permission:</span>{" "}
                {user.permission?.join(", ") || "-"}
                </p>
                <Button
                onClick={() => handleEdit(user)}
                className="mt-3 px-4 py-2 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600 transition"
                >
                Edit
                </Button>
            </>
            )}
        </div>
        ))}
    </div>
  );
};

export default AdminUser;
