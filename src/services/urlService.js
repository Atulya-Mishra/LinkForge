
const prisma = require("../lib/prisma");
const { customAlphabet } = require("nanoid");

const generateCode = customAlphabet(
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    7
);

async function shortenUrl(originalUrl) {
    // Check whether the URL is valid
    let parsedUrl;

    try {
        parsedUrl = new URL(originalUrl);
    } catch {
        throw new Error("Invalid URL");
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error("Only HTTP and HTTPS URLs are allowed");
    }

    // Generate a unique short code
    let shortCode;

    for (let attempt = 0; attempt < 5; attempt++) {
        const candidate = generateCode();

        const existingUrl = await prisma.url.findUnique({
            where: { shortCode: candidate }
        });

        if (!existingUrl) {
            shortCode = candidate;
            break;
        }
    }

    if (!shortCode) {
        throw new Error("Could not generate a unique short code");
    }

    // Save URL in PostgreSQL
    const url = await prisma.url.create({
        data: {
            originalUrl,
            shortCode
        }
    });

    return url;
}

module.exports = { shortenUrl };
