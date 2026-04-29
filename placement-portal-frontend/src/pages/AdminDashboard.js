import React from "react";
import {
  Bar,
  Pie
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

function AdminDashboard() {

  // 📊 Dummy Data (later backend se aayega)
  const placementData = {
    labels: ["CSE", "IT", "Mechanical", "Civil"],
    datasets: [
      {
        label: "Students Placed",
        data: [120, 100, 80, 60],
        backgroundColor: "#4f46e5",
      },
    ],
  };

  const companyData = {
    labels: ["TCS", "Infosys", "Wipro", "Amazon"],
    datasets: [
      {
        label: "Hires",
        data: [50, 40, 30, 20],
        backgroundColor: ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b"],
      },
    ],
  };

  return (
    <div style={styles.container}>

      <h2>Admin Analytics Dashboard 📊</h2>

      {/* KPI Cards */}
      <div style={styles.kpiContainer}>
        <div style={styles.card}>Placement Rate: 78%</div>
        <div style={styles.card}>Avg Package: ₹6 LPA</div>
        <div style={styles.card}>Total Students: 500</div>
      </div>

      {/* Charts */}
      <div style={styles.chartContainer}>

        <div style={styles.chartBox}>
          <h4>Branch-wise Placement</h4>
          <Bar data={placementData} />
        </div>

        <div style={styles.chartBox}>
          <h4>Company Hiring Distribution</h4>
          <Pie data={companyData} />
        </div>

      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#f9fafb",
    minHeight: "100vh",
  },
  kpiContainer: {
    display: "flex",
    gap: "20px",
    margin: "20px 0",
  },
  card: {
    flex: 1,
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    fontWeight: "bold",
  },
  chartContainer: {
    display: "flex",
    gap: "30px",
    marginTop: "30px",
  },
  chartBox: {
    flex: 1,
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
};

export default AdminDashboard;