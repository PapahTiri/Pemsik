import React from "react";
import { useParams } from "react-router-dom";
import Card from "../Layouts/Components/Card";
import Heading from "../Layouts/Components/Heading";

import { mahasiswaList } from "../Data/dummy";

const MahasiswaDetail = () => {
  const { nim } = useParams();
  const mahasiswa = mahasiswaList.find((m) => m.nim === nim);

  if (!mahasiswa) {
    return <p className="text-red-600">Data mahasiswa tidak ditemukan.</p>;
  }

  return (
    <Card>
      <Heading as="h2" className="mb-4 text-left">Detail Mahasiswa</Heading>
      <table className="table-auto text-sm w-full">
        <tbody>
          <tr>
            <td className="py-2 px-4 font-medium">NIM</td>
            <td className="py-2 px-4">{mahasiswa.nim}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium">Nama</td>
            <td className="py-2 px-4">{mahasiswa.nama}</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default MahasiswaDetail;