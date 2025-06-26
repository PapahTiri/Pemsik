import Button from "../../../Layouts/Components/Button";
import { confirmLogout } from "../../../Utils/Helpers/SwalHelpers";
import { useAuth } from "../../../../Axios/Apis/AuthContext";
import { NavLink } from "react-router-dom";



const Header = () => {
  const { user } = useAuth();
  const toggleProfileMenu = () => {
    const menu = document.getElementById("profileMenu");
    if (menu) menu.classList.toggle("hidden");
  };

const handleLogout = () => {
  confirmLogout(() => {
    localStorage.removeItem("user");
    location.href = "/";
  });
};

  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="text-gray-800">
          {user ? (
            <>
              <h1 className="text-2xl font-semibold">Halo, {user.name}</h1>
              <p className="text-sm text-gray-500 capitalize">Role: {user.role}</p>
            </>
          ) : (
            <h1 className="text-2xl font-semibold">Halo, Guest</h1>
          )}
        </div>

        <div className="relative">
          <Button
            onClick={toggleProfileMenu}
            className="w-8 h-8 rounded-full bg-gray-300 focus:outline-none"
          />
          <div
            id="profileMenu"
            className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 hidden"
          >
            <NavLink to="/admin/user" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</NavLink>
            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;