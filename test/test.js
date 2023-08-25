const assert = require('assert');
const verifyImage = require('../checkImage');
const convertImage = require('../convertImage');

describe("Image Verification", function() {

    it("should verify that the size is 512x512", async function() {
        const validSize = await verifyImage("path_to_512x512_image.png");
        assert.strictEqual(validSize, true);
    });

    it("should verify that non-transparent pixels are within a circle", async function() {
        // Use an image that meets the requirement
        const validPixels = await verifyImage("path_to_valid_image.png");
        assert.strictEqual(validPixels, true);
    });

    it("should verify that colors give a 'happy' feeling", async function() {
        const happyFeeling = await verifyImage("path_to_happy_colors_image.png");
        assert.strictEqual(happyFeeling, true);
    });

});

describe("Image Conversion", function() {

    it("should convert an image and pass it to verify image function", async function() {
        const outputPath = "path_to_output_image.png";
        await convertImage("path_to_valid_image.png", outputPath);
        const valid = await verifyImage(outputPath);
        assert.strictEqual(valid, true);
    });

    it("should fail to verify an invalid image after conversion", async function() {
        const outputPath = "path_to_invalid_output_image.png";
        await convertImage("path_to_invalid_image.png", outputPath);
        const valid = await verifyImage(outputPath);
        assert.strictEqual(valid, false);
    });

    it("should convert and verify images with different formats", async function() {
        const outputPath = "path_to_converted_jpg_image.png";
        await convertImage("path_to_image.jpg", outputPath);
        const valid = await verifyImage(outputPath);
        assert.strictEqual(valid, true);
    });

});

