import Input from "../Layouts/Components/Input";
import Label from "../Layouts/Components/Label";
import Button from "../Layouts/Components/Button";
import Link from "../Layouts/Components/Link";
import Form from "../Layouts/Components/Form";
import Heading from "../Layouts/Components/Heading";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../Utils/Apis/UserApi";
import { toastSuccess, toastError } from "../Utils/Helpers/ToastHelpers";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await registerUser(form);
        localStorage.setItem("user", JSON.stringify(res.data));
        toastSuccess("Registrasi berhasil");
        navigate("/admin/dashboard");
    } catch (err) {
        toastError("Gagal registrasi");
    }
};

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Heading as="h2" className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Daftar Akun Baru di Katha
        </Heading>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
          <Form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                Nama Lengkap
              </Label>
              <div className="mt-2">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={form.name}
                  required
                  autoComplete="name"
                  placeholder="Nama Lengkap"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Alamat Email
              </Label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={form.email}
                  required
                  autoComplete="email"
                  placeholder="Email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </Label>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={form.password}
                  required
                  autoComplete="new-password"
                  placeholder="Password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Daftar
              </Button>
            </div>
          </Form>
        </div>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Sudah punya akun?{" "}
          <Link href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
