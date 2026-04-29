import React, { useState } from "react";
import axios from "axios";

function CompanyDashboard() {
  const [job, setJob] = useState({
    title: "",
    skills: "",
    package: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/jobs", job);
      alert("Job Posted Successfully 🚀");
    } catch (error) {
      console.log(error);
      alert("Error posting job ❌");
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>
        <h2>Post a Job 🏢</h2>

        <form onSubmit={handleSubmit}>
          
          <input
            type="text"
            placeholder="Job Title"
            style={styles.input}
            onChange={(e) => setJob({ ...job, title: e.target.value })}
          />

          <input
            type="text"
            placeholder="Required Skills (comma separated)"
            style={styles.input}
            onChange={(e) => setJob({ ...job, skills: e.target.value })}
          />

          <input
            type="text"
            placeholder="Package (e.g. 6 LPA)"
            style={styles.input}
            onChange={(e) => setJob({ ...job, package: e.target.value })}
          />

          <button type="submit" style={styles.btn}>
            Post Job
          </button>

        </form>
      </div>

    </div>
  );
}

const styles = {
  container: {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f9fafb",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    width: "350px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  btn: {
    width: "100%",
    padding: "12px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default CompanyDashboard;