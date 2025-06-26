import { NavLink } from "react-router-dom";
import { useAuth } from "../../../../Axios/Apis/AuthContext";

const Sidebar = () => {
  const { user, hasPermission, logout } = useAuth();

  if (!user) return null;

  const navClass = ({ isActive }) =>
    `flex items-center space-x-2 px-4 py-2 rounded ${
      isActive ? "bg-blue-700" : "hover:bg-blue-700"
    }`;

  return (
    <aside className="bg-blue-800 text-white min-h-screen transition-all duration-300 w-20 lg:w-64">
      <div className="p-4 border-b border-blue-700">
        <span className="text-2xl font-bold hidden lg:block">Admin</span>
      </div>
      <nav className="p-4 space-y-2">

        {hasPermission("dashboard.page") && (
          <NavLink to="/admin/dashboard" className={navClass}>
            <span>🏠</span>
            <span className="menu-text hidden lg:inline">Dashboard</span>
          </NavLink>
        )}

        {hasPermission("rencana-studi.page") && (
          <NavLink to="/admin/rencana-studi" className={navClass}>
            <span>📝</span>
            <span className="menu-text hidden lg:inline">Rencana Studi</span>
          </NavLink>
        )}

        {hasPermission("mahasiswa.page") && (
          <NavLink to="/admin/mahasiswa" className={navClass}>
            <span>🎓</span>
            <span className="menu-text hidden lg:inline">Mahasiswa</span>
          </NavLink>
        )}

        {hasPermission("dosen.page") && (
          <NavLink to="/admin/dosen" className={navClass}>
            <span>🧑‍🏫</span>
            <span className="menu-text hidden lg:inline">Dosen</span>
          </NavLink>
        )}

      </nav>
    </aside>
  );
};

export default Sidebar;
