const verifyImage = require('./checkImage');
const convertImage = require('./convertImage');

(async () => {
    try {
        // Replace with your image path
        const filePath = 'path_to_image.png'; // Replace with your image path

        // Check the image
        const isValid = await verifyImage(filePath);
        if (isValid) {
            console.log("Image is valid!");
        }

        // Convert the image
        await convertImage(filePath);
        console.log("Image converted successfully!");
    } catch (error) {
        console.error(error.message);
    }

})();
