const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const assert = require('assert');
const verifyImage = require('../checkImage');
const convertImage = require('../convertImage');
const { verifySize, checkHappyColors, checkPixelsWithinCircle } = require('../utils/checkUtils');
const { MAX_WIDTH, MAX_HEIGHT } = require('../utils/constants');

const readImage = async (filePath) => {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    const raw = await image.raw().toBuffer();
    return { metadata, raw };
}

describe("Image Verification Components", function() {

    it("verifySize() should verify that the size is 512x512", async function() {
        const image_512_x_512 = path.join(__dirname, "..", "images/test_pic.png");
        const { metadata, _ } = await readImage(image_512_x_512);
        const validSize = verifySize(metadata);
        assert.strictEqual(validSize, true);
    });

    it("checkPixelsWithinCircle() should verify that non-transparent pixels are within a circle", async function() {
        const test_pic = path.join(__dirname, "..", "images/test_pic.png");
        const { _, raw } = await readImage(test_pic);
        const validSize = checkPixelsWithinCircle(raw);
        assert.strictEqual(validSize, true);
    });

    it("checkHappyColors() should verify that colors give a 'happy' feeling", async function() {
        const test_pic = path.join(__dirname, "..", "images/test_pic.png");
        const { _, raw } = await readImage(test_pic);
        const validSize = checkHappyColors(raw, false);
        assert.strictEqual(validSize, true);
    });

});

describe("Image Verification", function() {

    it("verifyImage() should verify that the size is 512x512, non-transparent pixels are within a circle, and colors give a 'happy' feeling", async function() {
        const valid_image = path.join(__dirname, "..", "images/test_pic.png");
        const isValid = await verifyImage(valid_image, false);
        assert.strictEqual(isValid, true);
    });

    it("verifyImage() should not verify if badge image doesn't meet our requirements", async function() {
        const invalid_image = path.join(__dirname, "..", "images/avatar.png");
        const isValid = await verifyImage(invalid_image, false);
        assert.strictEqual(isValid, false);
    });

});

describe("Image Conversion", function() {

    const testFormats = ['jpeg', 'png', 'webp']; // add any other formats you'd like to test

    for (const format of testFormats) {
        it(`convertImage() should handle an image of format '.${format}'`, async function() {

            const input_image = path.join(__dirname, "..", `images/convert_test_image.${format}`);
            const output_image = path.join(__dirname, "..", `images/convert_test_output_image.png`); // as we're converting all to .png format
            
            // Remove any existing output file
            if (fs.existsSync(output_image)) { fs.unlinkSync(output_image); }

            // Check if the input image exists
            if (!fs.existsSync(input_image)) {
                assert.fail(`Test image of format .${format} does not exist.`);
                return;
            }

            await convertImage(input_image, output_image);

            // Check if the output file exists
            if (!fs.existsSync(output_image)) {
                assert.fail(`Output image for format .${format} was not created.`);
                return;
            }

            // Check if the output image has the expected size and format
            const { format: outputFormat } = await sharp(output_image).metadata();
            assert.strictEqual(outputFormat, 'png'); // assuming we always want PNG output
        });
    }

    it(`convertImage() should produce an image of size ${MAX_WIDTH}x${MAX_HEIGHT}`, async function() {
        
        const input_image = path.join(__dirname, "..", "images/avatar-wide.png");
        const output_image = path.join(__dirname, "..", "images/converted_avatar-wide.png");

        // Remove any existing output file
        if (fs.existsSync(output_image)) { fs.unlinkSync(output_image); }
        
        // Check if the input image exists
        if (!fs.existsSync(input_image)) {
            assert.fail(`Test image does not exist.`);
            return;
        }

        await convertImage(input_image, output_image);

        // Check if the output file exists
        if (!fs.existsSync(output_image)) {
            assert.fail(`Output image was not created.`);
            return;
        }

        const { width, height } = await sharp(output_image).metadata();
        assert.strictEqual(width, MAX_WIDTH);
        assert.strictEqual(height, MAX_HEIGHT);
    });

    it('convertImage() should make pixels outside the circle transparent', async function() {
        const output_image = path.join(__dirname, "..", "images/converted_avatar-wide.png");

        if (!fs.existsSync(output_image)) {
            assert.fail(`Output image was not created.`);
            return;
        }

        const { data } = await sharp(output_image).raw().toBuffer({ resolveWithObject: true });

        const center = { x: MAX_WIDTH / 2, y: MAX_HEIGHT / 2 };

        for (let y = 0; y < MAX_HEIGHT; y++) {
            for (let x = 0; x < MAX_WIDTH; x++) {
                const idx = (y * MAX_WIDTH + x) * 4;
                const dist = Math.sqrt(Math.pow(center.x - x, 2) + Math.pow(center.y - y, 2));

                if (dist > 256) {
                    assert.strictEqual(data[idx + 3], 0); // Alpha channel should be 0 for transparent pixel
                }
            }
        }
    });

    it("convertImage() should convert an image and pass it to verifyImage() function with no errors", async function() {

        const input_image = path.join(__dirname, "..", "images/pic.jpeg");
        const output_image = path.join(__dirname, "..", "images/converted_pic.png");

        // Remove any existing output file
        if (fs.existsSync(output_image)) { fs.unlinkSync(output_image); }

        // Check if the input image exists
        if (!fs.existsSync(input_image)) {
            assert.fail(`Test image does not exist.`);
            return;
        }

        await convertImage(input_image, output_image);

        // Check if the output file exists
        if (!fs.existsSync(output_image)) {
            assert.fail(`Output image was not created.`);
            return;
        }

        const isValid = await verifyImage(output_image, false);
        assert.strictEqual(isValid, true);

    });

});

