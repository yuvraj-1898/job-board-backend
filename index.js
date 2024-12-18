const express = require("express");
const mongoose = require("mongoose");
const authRoutes=require("./routes/authRoute")
const companyRoutes=require("./routes/companyRoute");
const jobRoutes=require("./routes/jobRoute");
require("dotenv").config();

const app = express();
app.use(express.json()); // Parse JSON requests

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

  app.use('/api/auth', authRoutes);
  app.use('/api/company',companyRoutes);
  app.use('/api/job',jobRoutes);
  
// Basic route
app.get("/", (req, res) => {
  res.send("Job Board API is running!");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));