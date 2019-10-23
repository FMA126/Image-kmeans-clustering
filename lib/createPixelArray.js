const createPixelArray = decodedArray => {
    const { width, height, data } = decodedArray;
    const pixelArray = [];
    // let row = [];
    
    for (let i = 0; i < data.length / 4; i++) {
        let offset = i * 4;
        pixelArray.push({
            r: data[offset],
            g: data[offset + 1],
            b: data[offset + 2],
        })

        // if (offset != 0 && offset % height === 0 || offset === data.length / 4 + 1) {
        //     // console.log('width', row.length)
        //     pixelArray.push(row);
        //     row = [];
        // }

    }
    // console.log('height', pixelArray.length)
    // console.log(pixelArray);
    return [pixelArray, width, height];
}

module.exports = {
    createPixelArray,
}
