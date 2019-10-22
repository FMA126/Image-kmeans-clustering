const pixel = require('../lib/createPixelArray');
const decode = require('../lib/decodeJPEG');
const createPixelArray = pixel.createPixelArray;
const decodeJPEG = decode.decodeJPEG;

const decodedImage = decodeJPEG('media/fruit-salad.jpeg');
const rawPixelData = createPixelArray(decodedImage);

module.exports = {
  rawPixelData
}