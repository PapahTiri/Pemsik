import { useParams } from "react-router-dom";
import Card from "../Layouts/Components/Card";
import Heading from "../Layouts/Components/Heading";

import { DosenList } from "../Data/dummy";

const DosenDetail = () => {
    const { nim } = useParams();
    const dosen = DosenList.find((d) => d.nim === nim);

    if (!dosen) {
        return <p className="text-red-600">Data Dosen tidak ditemukan</p>
    }

    return (
    <Card>
      <Heading as="h2" className="mb-4 text-left">Detail Dosen</Heading>
      <table className="table-auto text-sm w-full">
        <tbody>
          <tr>
            <td className="py-2 px-4 font-medium">NIM</td>
            <td className="py-2 px-4">{dosen.nim}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium">Nama</td>
            <td className="py-2 px-4">{dosen.nama}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium">matkul</td>
            <td className="py-2 px-4">{dosen.matkul}</td>
          </tr>
        </tbody>
      </table>
    </Card>
    );
};

export default DosenDetail;