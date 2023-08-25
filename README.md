# Image Badge Verification and Conversion

This project provides tools to verify badge images based on specific criteria and convert any image into the required badge format.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mohammadzainabbas/badge-verifier.git
```

2. Navigate to the project directory:
```bash
cd badge-verifier/
```

3. Install dependencies:
```bash
npm install
```

## Usage

### Verify an Image

```bash
node index.js verify <path-to-image>
```

This will verify if the image meets the badge criteria. The image must be in PNG format for verification.

For example:
```bash
node index.js verify ./images/valid.png
```

### Convert an Image

```bash
node index.js convert <path-to-image> <output-name>
```

This will convert any valid image format into the badge format and save it with the provided output name.

> Note that in the convert command, <output-name> is optional. If not provided, the output will be saved as `convertedImage.png` by default.

## Test

Run the tests to ensure the verification and conversion processes are working as expected:

```bash
npm test
```

## Criteria for Badge Image

1. Size should be 512x512 pixels.
2. Only non-transparent pixels should be within a circle.
3. The colors of the badge should convey a "happy" feeling. (This is a simplification based on HSV values).

## Dependencies

- [sharp](https://www.npmjs.com/package/sharp): Used for image processing.
- [color-convert](https://www.npmjs.com/package/color-convert): Used for color conversion.
