const sharp = require('sharp');
const { verifySize, checkHappyColors, checkPixelsWithinCircle } = require('./utils/checkUtils');

/**
 * Verify the badge image
 * 
 * 1. Verify the size is 512x512
 * 2. Ensure non-transparent pixels are within a circle
 * 3. Ensure colors of the badge give a "happy" feeling
 * 
 * @param {string} filePath - Path to the image
 * @returns {boolean} - True if the image is valid, false otherwise
 * @async
 */
async function verifyImage(filePath) {

    // Ensure the image is of PNG format for verification
    if (path.extname(filePath) !== '.png') {
        console.log('❌ Please provide a PNG image for verification.');
        return false;
    }

    // Fetch metadata
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // 1. Verify the size is 512x512
    const validSize = verifySize(metadata);
    if (!validSize) {
        console.log(`❌ Please provide an image that is ${MAX_WIDTH}x${MAX_HEIGHT}.`);
        return false;
    }

    // 2. Ensure non-transparent pixels are within a circle
    const raw = await image.raw().toBuffer();
    const withInCircle = checkPixelsWithinCircle(raw);
    if (!withInCircle) {
        console.log('❌ Non-transparent pixel outside circle');
        return false;
    }

    // 3. Ensure happy colors
    const isHappyColors = checkHappyColors(raw);
    if (!isHappyColors) {
        console.log('❌ Image colors do not convey a happy feeling');
        return false;
    }

    return true;
}

module.exports = verifyImage;
