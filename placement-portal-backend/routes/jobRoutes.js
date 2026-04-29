// routes/jobRoutes.js
const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

const axios = require("axios");
const multer = require("multer");
const FormData = require("form-data");
const fs = require("fs");

// 📂 Upload setup
const upload = multer({ dest: "uploads/" });

/**
 * ==========================
 * 📥 GET ALL JOBS
 * ==========================
 */
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching jobs" });
  }
});

/**
 * ==========================
 * 📥 GET SINGLE JOB (DETAIL)
 * ==========================
 */
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching job" });
  }
});

/**
 * ==========================
 * 📤 POST NEW JOB
 * ==========================
 */
router.post("/", async (req, res) => {
  try {
    console.log("Incoming job:", req.body);

    const job = new Job(req.body);
    await job.save();

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving job" });
  }
});

/**
 * ==========================
 * 🤖 AI RESUME PARSER + MATCH
 * ==========================
 */
router.post("/match", upload.single("resume"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 📦 send file to Python AI service
    const formData = new FormData();
    formData.append("resume", fs.createReadStream(file.path));

    const response = await axios.post(
      "http://127.0.0.1:8000/parse",
      formData,
      { headers: formData.getHeaders() }
    );

    // 🧹 delete uploaded temp file
    fs.unlinkSync(file.path);

    res.json(response.data);

  } catch (error) {
    console.error("AI ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "AI parsing failed" });
  }
});

module.exports = router;