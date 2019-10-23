const pixel = require('../lib/createPixelArray');
const decode = require('../lib/decodeJPEG');
const createPixelArray = pixel.createPixelArray;
const decodeJPEG = decode.decodeJPEG;

const decodedImage = decodeJPEG('media/fruit-salad.jpeg');
const rawPixelArray = createPixelArray(decodedImage);
const rawPixelData = rawPixelArray[0];
const width = rawPixelArray[1];
const height = rawPixelArray[2]

module.exports = {
  rawPixelData,
  width,
  height
}