// Convert RGB to HSV
function rgbToHsv(r, g, b) {
    r /= 255, g /= 255, b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    let d = max - min;

    if (max == 0) s = 0;
    else s = d / max;

    if (max == min) h = 0; // achromatic
    else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, v];
}

// Check if color gives a happy feeling (this is basic and can be fine-tuned)
function isHappyColor(r, g, b) {
    const [h, s, v] = rgbToHsv(r, g, b);
    // Roughly check for hues corresponding to yellow, light greens, bright blues
    return (h >= 0.1 && h <= 0.2) || (h >= 0.3 && h <= 0.6);
}

module.exports = { isHappyColor };