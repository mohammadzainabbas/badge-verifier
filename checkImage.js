const sharp = require('sharp');
const { isHappyColor } = require('./utils/colorUtils');

async function verifyImage(filePath) {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Check size
    if (metadata.width !== 512 || metadata.height !== 512) {
        throw new Error("Image size is not 512x512");
    }

    // Fetch raw pixel data
    const raw = await image.raw().toBuffer();
    const center = { x: 256, y: 256 };
    let isHappy = true;

    for (let y = 0; y < 512; y++) {
        for (let x = 0; x < 512; x++) {
            const idx = (y * 512 + x) * 4;
            const r = raw[idx];
            const g = raw[idx + 1];
            const b = raw[idx + 2];
            const a = raw[idx + 3];

            const dist = Math.sqrt(Math.pow(center.x - x, 2) + Math.pow(center.y - y, 2));

            if (a !== 0 && dist > 256) {
                throw new Error("Non-transparent pixel outside circle");
            }

            if (a !== 0 && !isHappyColor(r, g, b)) {
                isHappy = false;
            }
        }
    }

    if (!isHappy) {
        throw new Error("Image colors do not convey a happy feeling");
    }

    return true;
}

module.exports = verifyImage;
