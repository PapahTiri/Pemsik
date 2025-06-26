import Button from "../Layouts/Components/Button";

const TableDosen = ({ data = [], onEdit, onDelete, onDetail, isLoading }) => {
   if (isLoading) return <p>Loading...</p>;
  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-left">Max SKS</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((dsn, index) => (
          <tr
            key={dsn.id}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
          >
            <td className="py-2 px-4">{dsn.name}</td>
            <td className="py-2 px-4">{dsn.max_sks}</td>
            <td className="py-2 px-4 text-center space-x-2">
              <Button onClick={() => onDetail(dsn.id)}>Detail</Button>
              <Button size="sm" variant="warning" onClick={() => onEdit(dsn)}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(dsn.id)}
              >
                Hapus
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableDosen;
