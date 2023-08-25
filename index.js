const fs = require('fs');
const path = require('path');
const verifyImage = require('./checkImage');
const convertImage = require('./convertImage');
const { DEFAULT_IMAGE, DEFAULT_OUTPUT } = require('./utils/constants');

(async () => {
    try {
        const command = process.argv[2];

        switch (command) {
            case 'verify':
                const verifyImagePath = process.argv[3] || path.join(__dirname, DEFAULT_IMAGE);

                // Check if file exists
                if (!fs.existsSync(verifyImagePath)) {
                    throw new Error(`❌ File '${verifyImagePath}' does not exist.`);
                }

                // Verify the image
                const valid = await verifyImage(verifyImagePath);
                console.log(valid ? `✅ Verified badge pic ('${verifyImagePath}') successfully!` : `❌ '${verifyImagePath}' is not a valid badge image!`);
                break;

            case 'convert':
                const convertImagePath = process.argv[3] || path.join(__dirname, DEFAULT_IMAGE);
                const outputFilename = process.argv[4] || DEFAULT_OUTPUT;

                // Check if file exists
                if (!fs.existsSync(convertImagePath)) {
                    throw new Error(`❌ File '${convertImagePath}' does not exist.`);
                }

                // Convert the image (can accept any valid image format)
                await convertImage(convertImagePath, outputFilename)
                    .then(() => console.log(`✅ Converted '${convertImagePath}' to '${outputFilename}' successfully!`))
                    .catch(err => console.error(err.message));
                break;

            default:
                console.error("❌ Invalid command. Use 'verify' or 'convert'.");
        }
    } catch (error) {
        console.error(error.message);
    }
})();
