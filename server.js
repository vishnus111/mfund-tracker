import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/config/db.js";
import morgan from "morgan";
import cors from "cors";
import  updateNavJob from "./src/utils/navCron.js";
import adminRoutes from "./src/routes/adminRoutes.js"




dotenv.config()
console.log("JWT_SECRET Loaded:", process.env.JWT_SECRET ? "Yes" : "No");

updateNavJob();


//Uncomment this to seed fund list into DB
// import importFunds from "./src/utils/importFunds.js"
// importFunds();


import authRoutes from "./src/routes/authRoutes.js";
import portfolioRoutes from  "./src/routes/portfolioRoutes.js";
import fundRoutes from "./src/routes/fundRoutes.js"



const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use((req, res, next) => {
    console.log("➡️ Incoming request:", req.method, req.url, req.body);
    next();
  });

app.get("/", (req, res) => res.send("API running"));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/funds", fundRoutes);

// Start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
