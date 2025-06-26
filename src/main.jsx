import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./app.css";

import AuthLayout from "./Pages/Layouts/AuthLayout";
import AdminLayout from "./Pages/Admin/Layouts/AdminLayout";
import ProtectedRoute from "./Pages/Protected/ProtectedRoute";

import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Mahasiswa from "./Pages/Admin/Mahasiswa";
import MahasiswaDetail from "./Pages/Admin/MahasiswaDetail";
import PageNotFound from "./Pages/Admin/Layouts/Components/PageNotFound";

import RencanaStudi from "./Pages/Rencana-studi/RencanaStudi";

import Dosen from "./Pages/Admin/Dosen";
import DosenDetail from "./Pages/Admin/DosenDetail";

import Dashboard from "./Pages/Admin/Layouts/Dashboard";

import { AuthProvider } from "./Axios/Apis/AuthContext";
import  AdminUser  from "./Pages/Admin/AdminUser";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
        {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
       {
        path: "user",
        element: <AdminUser />,
      },
      {
        path: "rencana-studi",
        element: <RencanaStudi />,
      },
      {
        path: "Mahasiswa",
        children: [
          {
            index: true,
            element: <Mahasiswa />,
          },
          {
            path: ":nim",
            element: <MahasiswaDetail />,
          },
        ],
      },
      {
        path: "Dosen",
        children: [
          {
            index: true,
            element: <Dosen />,
          },
          {
            path: "nim",
            element: <DosenDetail />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
],
  {
    basename: "/Pemsik",
  },
);
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
