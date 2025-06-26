import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line
} from 'recharts';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFE", "#EF4444", "#22D3EE"];

const DashboardChart = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Mahasiswa per Fakultas */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Mahasiswa per Fakultas</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.students}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="faculty" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Rasio Gender */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Rasio Gender Mahasiswa</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data.genderRatio}
              dataKey="count"
              nameKey="gender"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.genderRatio.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Pendaftaran per Tahun */}
      <div className="bg-white rounded shadow p-4 col-span-2">
        <h2 className="font-semibold mb-2">Jumlah Pendaftar per Tahun</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data.registrations}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#00C49F" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Distribusi Nilai */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Distribusi Nilai per Mata Kuliah</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.gradeDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="A" stackId="a" fill="#4ade80" />
            <Bar dataKey="B" stackId="a" fill="#facc15" />
            <Bar dataKey="C" stackId="a" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pangkat Dosen */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Jumlah Dosen per Jabatan</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data.lecturerRanks}
              dataKey="count"
              nameKey="rank"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.lecturerRanks.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;
