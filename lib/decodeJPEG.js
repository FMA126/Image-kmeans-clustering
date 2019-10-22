const fs = require('fs');
const jpeg = require('jpeg-js');

const decodeJPEG = file => {
    const image = fs.readFileSync(file)
    const decoded = jpeg.decode(image, true);
    console.log(decoded);
    return decoded;
}

module.exports = {
  decodeJPEG
}