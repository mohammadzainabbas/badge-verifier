const sharp = require('sharp');
const { MAX_WIDTH, MAX_HEIGHT, DEFAULT_OUTPUT } = require('./utils/constants');

/**
 * Converts the image to the required badge format
 * @param {string} filePath - Path to the image file
 * @param {string} outputPath - Path to the output file
 * @returns {Promise} - Promise that resolves when the image is converted
 * @throws {Error} - If the image cannot be converted
 * @example
 * 
 * convertImage('image.png', 'output.png');
 * // => Promise
 * 
 * convertImage('image.png', 'output.png')
 *    .then(() => console.log('Image converted!'))
 *   .catch(err => console.error(err.message));
 * // => Image converted!
 *  
 **/
function convertImage(filePath, outputPath = DEFAULT_OUTPUT) {
    const center = { x: MAX_WIDTH / 2, y: MAX_HEIGHT / 2 }; // Center of the circle

    // Resize the image to 512x512 and convert to sRGB
    return sharp(filePath)
        .ensureAlpha() // Ensure the image has an alpha channel (i.e. transparency)
        .resize(MAX_WIDTH, MAX_HEIGHT)
        .toColourspace('srgb')
        .raw()
        .toBuffer({ resolveWithObject: true })
        .then(({ data, info }) => {
            // Make all pixels which are outside the circle transparent
            for (let y = 0; y < info.height; y++) {
                for (let x = 0; x < info.width; x++) {
                    const idx = (y * info.width + x) * info.channels;
                    const dist = Math.sqrt(Math.pow(center.x - x, 2) + Math.pow(center.y - y, 2));

                    const alphaIdx = idx + 3;

                    if (dist <= 256) {  // Inside the circle
                        if (data[alphaIdx] === 0) {  // If transparent
                            data[idx] = 255;      // Set to white
                            data[idx + 1] = 255;  // Set to white
                            data[idx + 2] = 255;  // Set to white
                            data[alphaIdx] = 255; // Make it opaque
                        }
                    } else {  // Outside the circle
                        data[idx] = 0;
                        data[idx + 1] = 0;
                        data[idx + 2] = 0;
                        data[alphaIdx] = 0;  // Make it transparent
                    }
                }
            }

            return sharp(data, {
                raw: {
                    width: info.width,
                    height: info.height,
                    channels: info.channels
                }
            }).png().toFile(outputPath);
        })
        .catch(err => {
            throw new Error(`Error converting image: ${err.message}`);
        });
}

module.exports = convertImage;
