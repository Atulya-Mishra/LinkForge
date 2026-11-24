
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "LinkForge API is running"
    });
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`LinkForge server running on port ${PORT}`);
});
