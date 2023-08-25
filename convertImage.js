const sharp = require('sharp');

function convertImage(filePath) {
    const center = { x: 256, y: 256 };

    return sharp(filePath)
        .resize(512, 512)
        .toColourspace('srgb')
        .raw()
        .toBuffer({ resolveWithObject: true })
        .then(({ data, info }) => {
            for (let y = 0; y < info.height; y++) {
                for (let x = 0; x < info.width; x++) {
                    const idx = (y * info.width + x) * info.channels;
                    const dist = Math.sqrt(Math.pow(center.x - x, 2) + Math.pow(center.y - y, 2));

                    if (dist > 256) {
                        data[idx + 3] = 0; // set alpha to 0 for pixels outside circle
                    }
                }
            }
            return sharp(data, {
                raw: {
                    width: info.width,
                    height: info.height,
                    channels: info.channels
                }
            }).png().toFile('convertedImage.png');
        });
}

module.exports = convertImage;
