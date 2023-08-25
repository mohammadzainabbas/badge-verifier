const sharp = require('sharp');
const { isHappyColor } = require('./colorUtils');
const { MAX_WIDTH, MAX_HEIGHT } = require('./constants');

/**
 * Verify the size is 512x512
 * @param {*} metadata - Image metadata
 * @returns {boolean} - True if the image is 512x512, false otherwise
 */
const verifySize = metadata => metadata.width === MAX_WIDTH && metadata.height === MAX_HEIGHT;

/**
 * Ensure non-transparent pixels are within a circle
 * @param {*} raw - Raw image data
 * @returns {boolean} - True if all non-transparent pixels are within a circle, false otherwise
 */
const checkPixelsWithinCircle = raw => {
    let pixelInsideCircle = true;
    const center = { x: 256, y: 256 };
    for (let y = 0; y < 512; y++) {
        for (let x = 0; x < 512; x++) {
            const idx = (y * 512 + x) * 4;
            const a = raw[idx];
            const dist = Math.sqrt(Math.pow(center.x - x, 2) + Math.pow(center.y - y, 2));
            if (a !== 0 && dist > 256) {
                pixelInsideCircle = false;
            }
        }
    }
    return pixelInsideCircle;
}

/**
 * Ensure colors of the badge give a "happy" feeling
 * Basic idea: check if the Hue value lies within the range of colors generally considered "happy" (yellows, light greens, bright blues, etc.).
 * 
 * Note: This is a simplification and may not be 100% accurate.
 * You could use research/data on color psychology to fine-tune this function.
 * 
 * @param {*} raw - Raw image data
 * @returns {boolean} - True if the image colors give a "happy" feeling, false otherwise
 */
const checkHappyColors = raw => {
    let isHappy = true;
    for (let y = 0; y < 512; y++) {
        for (let x = 0; x < 512; x++) {
            const idx = (y * 512 + x) * 4;
            const r = raw[idx];
            const g = raw[idx + 1];
            const b = raw[idx + 2];
            if (!isHappyColor(r, g, b)) {
                isHappy = false;
            }
        }
    }
    return isHappy;
}

module.exports = {
    verifySize,
    checkPixelsWithinCircle,
    checkHappyColors
};
