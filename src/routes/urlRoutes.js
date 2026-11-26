
const express = require("express");
const { shortenUrl } = require("../services/urlService");

const router = express.Router();

router.post("/shorten", async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl || typeof originalUrl !== "string") {
            return res.status(400).json({
                status: "error",
                message: "Please provide a valid originalUrl"
            });
        }

        const url = await shortenUrl(originalUrl);

        res.status(201).json({
            status: "success",
            message: "URL shortened successfully",
            data: {
                originalUrl: url.originalUrl,
                shortCode: url.shortCode,
                shortUrl: `${req.protocol}://${req.get("host")}/${url.shortCode}`
            }
        });

    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
    }
});

module.exports = router;
