// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ==========================
// 🌐 MIDDLEWARE
// ==========================
app.use(cors());
app.use(express.json());

// 📂 Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==========================
// 🔗 ROUTES
// ==========================
const jobRoutes = require("./routes/jobRoutes");
app.use("/jobs", jobRoutes);

// ==========================
// 🧪 TEST ROUTE
// ==========================
app.get("/", (req, res) => {
  res.send("🚀 Placement Portal API running...");
});

// ==========================
// ❌ GLOBAL ERROR HANDLER
// ==========================
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// ==========================
// 🗄️ DATABASE + SERVER START
// ==========================
const startServer = async () => {
  try {
    
    await mongoose.connect("mongodb://127.0.0.1:27017/placementDB");

    console.log("✅ MongoDB Connected");

    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`🔥 Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ DB Error:", err);
  }
};

startServer();