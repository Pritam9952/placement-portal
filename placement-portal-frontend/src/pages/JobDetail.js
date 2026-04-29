import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/jobs/${id}`)
      .then(res => setJob(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!job) return <p style={{padding:20}}>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{job.title}</h2>
        <p><b>Company:</b> {job.company || "Unknown"}</p>
        <p>💰 {job.package}</p>
        <p>🏠 {job.location || "Work from home"}</p>
        <p>⏳ {job.experience || "0-2 yrs"}</p>

        <hr />

        <h3>About the job</h3>
        <p>{job.description || "No description available"}</p>

        <h3>Skills</h3>
        <p>{job.skills}</p>

        <button style={styles.btn}>Apply Now</button>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "40px", background: "#f9fafb" },
  card: {
    maxWidth: "700px",
    margin: "auto",
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },
  btn: {
    marginTop: "20px",
    padding: "12px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default JobDetail;