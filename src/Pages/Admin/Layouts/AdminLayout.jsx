import React from "react";
import Sidebar from "../../Admin/Layouts/Components/Sidebar";
import Header from "../../Admin/Layouts/Components/Header";
import Footer from "../../Admin/Layouts/Components/Footer";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 overflow-x-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;