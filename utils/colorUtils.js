const convert = require('color-convert'); // use 'color-convert' to convert RGB to HSV

/** 
 * Convert RGB to HSV
 * @param {*} r - Red value
 * @param {*} g - Green value
 * @param {*} b - Blue value
 * @returns {Array} - HSV values
 */
const rgbToHsv = (r, g, b) => convert.rgb.hsv(r, g, b);

/**
 * Check if color gives a happy feeling
 * Basic idea: check if the Hue value lies within the range of colors generally considered "happy" (yellows, light greens, bright blues, etc.).
 *
 * Note: This is a simplification and may not be 100% accurate.
 * You could use research/data on color psychology to fine-tune this function.
 * 
 * @param {*} r - Red value
 * @param {*} g - Green value
 * @param {*} b - Blue value
 * @returns 
 */
const isHappyColor = (r, g, b) => {
    const [h] = rgbToHsv(r, g, b);
    return (h >= 45 && h <= 90) || (h >= 91 && h <= 170) || (h >= 171 && h <= 260); 
}

module.exports = { isHappyColor };
