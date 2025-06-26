import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Mahasiswa from "./Pages/Admin/Mahasiswa";
import MahasiswaDetail from "./Pages/Admin/MahasiswaDetail";
import Dosen from "./Pages/Admin/Dosen";
import DosenDetail from "./Pages/Admin/DosenDetail";
import PageNotFound from "./Pages/Admin/Layouts/Components/PageNotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/admin/mahasiswa" element={<Mahasiswa />}/>
        <Route path="/admin/mahasiswa/:nim" element={<MahasiswaDetail />}/>
        <Route path="/admin/dosen" element={<Dosen />} />
        <Route path="/admin/dosen/:nim" element={<DosenDetail />} />
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </Router>
  )
};

export default App;