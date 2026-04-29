import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  // 🔥 Fetch jobs from backend
  useEffect(() => {
    axios.get("http://localhost:5000/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.container}>

      {/* 🔷 HERO */}
      <div style={styles.hero}>
        
        <motion.h1
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Smart Placement Portal 🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          AI-powered platform to match your skills with the best jobs
        </motion.p>

        <div style={styles.buttons}>
          
          <motion.button
            style={styles.btn}
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate("/student")}
          >
            Explore Jobs
          </motion.button>

          <motion.button
            style={styles.outlineBtn}
            whileHover={{ scale: 1.1 }}
            onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
          >
            Learn More
          </motion.button>

        </div>
      </div>


      {/* 🔷 JOB SECTION */}
      <motion.div
        style={styles.section}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>🔥 Featured Jobs</h2>

        {jobs.slice(0, 3).map(job => (
          <motion.div
            key={job._id}
            style={styles.jobCard}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => navigate(`/job/${job._id}`)}
          >
            <h3>{job.title}</h3>

            <p><b>Company:</b> {job.company || "Unknown"}</p>

            <p>
              💰 {job.package || "Not specified"} | 📍 {job.location || "Remote"} | ⏳ {job.experience || "0-2 yrs"}
            </p>

            <p>Skills: {job.skills}</p>

            <button style={styles.applyBtn}>
              View Details
            </button>
          </motion.div>
        ))}
      </motion.div>


      {/* 🔷 COMPANIES (CLICKABLE 🔥) */}
      <motion.div
        style={styles.sectionLight}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>🏢 Top Companies</h2>

        <div style={styles.companyGrid}>
          {[
            { name: "Google", link: "https://careers.google.com" },
            { name: "Amazon", link: "https://www.amazon.jobs" },
            { name: "Microsoft", link: "https://careers.microsoft.com" },
            { name: "TCS", link: "https://www.tcs.com/careers" }
          ].map((company, i) => (
            <motion.div
              key={i}
              style={styles.companyCard}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(company.link, "_blank")}
            >
              {company.name}
            </motion.div>
          ))}
        </div>
      </motion.div>


      {/* 🔷 INFO */}
      <motion.div
        style={styles.section}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>Why Use This Portal?</h2>

        <div style={styles.grid}>
          {[
            "🤖 AI Resume Parsing",
            "🎯 Smart Matching",
            "📊 Analytics"
          ].map((item, i) => (
            <motion.div
              key={i}
              style={styles.card}
              whileHover={{ scale: 1.05 }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>


      {/* 🔷 FOOTER */}
      <div style={styles.footer}>
        <p>© 2026 Smart Placement Portal | Built by Suraj 💻</p>
      </div>

    </div>
  );
}

const styles = {
  container: {
    fontFamily: "sans-serif",
  },

  hero: {
    height: "80vh",
    background: "linear-gradient(135deg, #4f46e5, #06b6d4)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  buttons: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
  },

  btn: {
    padding: "12px 25px",
    borderRadius: "8px",
    background: "#fff",
    color: "#111",
    border: "none",
    cursor: "pointer",
  },

  outlineBtn: {
    padding: "12px 25px",
    border: "2px solid #fff",
    borderRadius: "8px",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
  },

  section: {
    padding: "50px 20px",
    textAlign: "center",
  },

  sectionLight: {
    padding: "50px 20px",
    background: "#f3f4f6",
    textAlign: "center",
  },

  jobCard: {
    background: "#fff",
    padding: "20px",
    margin: "20px auto",
    maxWidth: "500px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    textAlign: "left",
    cursor: "pointer",
  },

  applyBtn: {
    marginTop: "10px",
    padding: "10px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  companyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  companyCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
    fontWeight: "bold",
    textAlign: "center",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },

  footer: {
    background: "#111",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
  },
};

export default Home;