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
 * Basic idea: Bright and vivid colors often evoke happiness more than muted ones.
 * Thus, ensuring that the saturation and value (brightness) of the colors are within a certain range might be beneficial.
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
    if (r !== 0 && g !== 0 && b !== 0) {
        const [h, s, v] = rgbToHsv(r, g, b);
        const isVivid = (s > 20 && v > 20);  // this ensures colors are neither too dull nor too dark
        return isVivid;
    }
    return true;
}

module.exports = { isHappyColor };
