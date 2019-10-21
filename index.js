const fs = require('fs');
const jpeg = require('jpeg-js');

const decodeJPEG = file => {
    const image = fs.readFileSync(file)
    const decoded = jpeg.decode(image, true);
    // console.log(decoded);
    return decoded;
}

const dFile = decodeJPEG('./media/fruit-salad.jpeg');

const createPixelArray = decodedArray => {
    const { width, height, data } = decodedArray;
    const pixelArray = [];
    let row = [];
    
    for (let i = 0; i < data.length / 4 + 1; i++) {
        let offset = i * 4;
        row.push({r: data[offset], g: data[offset + 1], b: data[offset + 2], a: data[offset + 3]})

        if (offset != 0 && offset % height === 0 || offset === data.length / 4 + 1) {
            // console.log('width', row.length)
            pixelArray.push(row);
            row = [];
        }

    }
    // console.log('height', pixelArray.length)
    // console.log(pixelArray[224]);
    return pixelArray;
}

createPixelArray(dFile);
