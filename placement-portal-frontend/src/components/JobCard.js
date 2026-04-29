import React from "react";

function JobCard({ job }) {
  return (
    <div style={styles.card}>
      <h3>{job.title}</h3>

      <p><strong>Skills:</strong> {job.skills}</p>
      <p><strong>Package:</strong> {job.package}</p>

      <button style={styles.btn}>Apply</button>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },
  btn: {
    marginTop: "10px",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
  },
};

export default JobCard;