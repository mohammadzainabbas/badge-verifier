const constants = {
    MAX_WIDTH: 512,
    MAX_HEIGHT: 512,
    DEFAULT_IMAGE: 'test_pic.png',
    DEFAULT_OUTPUT: 'convertedImage.png',
};

module.exports = { MAX_SIZE: constants.MAX_WIDTH * constants.MAX_HEIGHT, ...constants };