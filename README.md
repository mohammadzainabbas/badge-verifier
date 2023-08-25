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
node index.js path_to_image.png
```

This will verify if the image meets the badge criteria. The image must be in PNG format for verification.

### Convert an Image

```bash
node index.js path_to_image.ext output_name.png
```

This will convert any valid image format into the badge format and save it with the provided output name.

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
