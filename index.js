const path = require('path');
const verifyImage = require('./checkImage');
const convertImage = require('./convertImage');
const { DEFAULT_IMAGE, DEFAULT_OUTPUT } = require('./utils/constants');

(async () => {
    try {
        const defaultPath = path.join(__dirname, DEFAULT_IMAGE);
        const imagePath = process.argv[2] || defaultPath;

        // Verify the image
        const valid = await verifyImage(imagePath);
        console.log(valid ? `✅ Verified badge pic ('${imagePath}') successfully!` : `❌ '${imagePath}' is not a valid badge image!`);

        // Convert the image (can accept any valid image format)
        const outputFilename = process.argv[3] || DEFAULT_OUTPUT;
        await convertImage(imagePath, outputFilename)
        .then(() => console.log(`✅ Converted '${imagePath}' to '${outputFilename}' successfully!`))
        .error(err => console.error(err.message));
        
    } catch (error) {
        console.error(error.message);
    }
})();
