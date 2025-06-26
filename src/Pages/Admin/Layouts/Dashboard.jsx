import DashboardChart from "./Components/DashboardChart";
import dashboardData from "../../Data/db/dashboard.json";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [chartData, setChartData] = useState(null);

  useEffect(() => {
    setChartData(dashboardData);
  }, []);
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Selamat Datang di Dashboard</h1>

      {chartData ? (
        <DashboardChart data={chartData} />
      ) : (
        <p className="text-gray-500">Memuat data chart...</p>
      )}
    </div>
  );
};
  
export default Dashboard;