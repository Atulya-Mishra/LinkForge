
require("dotenv").config();
const urlRoutes = require("./routes/urlRoutes");

const express = require("express");
const prisma = require("./lib/prisma");

const app = express();

app.use(express.json());
app.use("/api", urlRoutes);
const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "LinkForge API is running"
    });
});

// Database health check
app.get("/api/health/db", async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        res.status(200).json({
            status: "success",
            message: "Database connected successfully"
        });

    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            status: "error",
            message: "Database connection failed"
        });
    }
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`LinkForge server running on port ${PORT}`);
});
