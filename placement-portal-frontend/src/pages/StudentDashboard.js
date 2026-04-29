import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";

function StudentDashboard() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [skills, setSkills] = useState([]);

  // 🔥 Fetch jobs
  useEffect(() => {
    axios
      .get("http://localhost:5000/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 📄 File select
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // 🤖 Upload + AI parse
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a resume file first");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const res = await axios.post(
        "http://localhost:5000/jobs/match",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setSkills(res.data.skills || []);
    } catch (error) {
      console.error(error);
      alert("Resume parsing failed ❌");
    }
  };

  // 🧠 MATCH FUNCTION
  const calculateMatch = (jobSkills) => {
    if (skills.length === 0) return 0;

    const jobSkillsArray = jobSkills
      .toLowerCase()
      .split(",")
      .map((s) => s.trim());

    const matchCount = jobSkillsArray.filter((skill) =>
      skills.includes(skill)
    ).length;

    return Math.round((matchCount / skills.length) * 100);
  };

  // 🔍 Filter + Sort by match %
  const filteredJobs = jobs
    .filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => calculateMatch(b.skills) - calculateMatch(a.skills));

  return (
    <div style={styles.container}>
      <h2>Student Dashboard 🚀</h2>

      {/* 📄 Upload */}
      <div style={styles.uploadBox}>
        <h3>Upload Resume 🤖</h3>

        <input type="file" onChange={handleFileChange} />
        <button style={styles.btn} onClick={handleUpload}>
          Analyze Resume
        </button>

        {/* 🧠 Skills */}
        {skills.length > 0 && (
          <div style={styles.skillsBox}>
            <h4>Extracted Skills:</h4>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search jobs..."
        style={styles.search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🧾 Jobs */}
      <div style={styles.grid}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            const match = calculateMatch(job.skills);

            return (
              <div
                key={job._id}
                style={{
                  border:
                    match > 50 ? "2px solid green" : "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "10px",
                  background: "#fff",
                }}
              >
                <JobCard job={job} />

                {skills.length > 0 && (
                  <>
                    <p>
                      <b>Match:</b> {match}%
                    </p>

                    {match > 50 && (
                      <p style={{ color: "green" }}>
                        🔥 Best Match
                      </p>
                    )}
                  </>
                )}
              </div>
            );
          })
        ) : (
          <p>No jobs found ❌</p>
        )}
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

  uploadBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },

  btn: {
    marginTop: "10px",
    padding: "10px 15px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  skillsBox: {
    marginTop: "15px",
    background: "#eef2ff",
    padding: "10px",
    borderRadius: "5px",
  },

  search: {
    padding: "10px",
    width: "300px",
    margin: "20px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
};

export default StudentDashboard;