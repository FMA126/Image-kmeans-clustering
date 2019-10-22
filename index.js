const jpeg = require('jpeg-js');
const fs = require('fs');

const cluster = require('./bin/clusters');
const data = require('./bin/rawPixelData');
// const rawPixelData = data.rawPixelData;
const clusterConvergence = cluster.clusterConvergence;

const colorMap = () => {
    const rawPixelData = data.rawPixelData;
    const clusterPixels = clusterConvergence(5, 100);
    const averageClusterColor = [];

    for (let k in clusterPixels) {
        // averageClusterColor.push(clusterPixels[curr].average);
        clusterPixels[k].forEach(curr => {
            averageClusterColor[curr.pixel.number] = clusterPixels[k].average;
            averageClusterColor[curr.pixel.number].a = 255;
        })
    }
    // console.log(averageClusterColor);
    return averageClusterColor;
}

const rawColorMap = colorMap();

const encodeJPEG = rawData => {
    // console.log(rawData.length)
    const width = 225;
    const height = 225;

    const frameData = [];

    let i = 0;

    while (i < rawData.length) {
        frameData.push(rawData[i].r); // red
        frameData.push(rawData[i].g); // green
        frameData.push(rawData[i].b); // blue
        frameData.push(rawData[i].a);
        i++; // alpha - ignored in JPEGs
    }

    const unit = Uint8Array.from(frameData)

    const rawImageData = {
        data: unit,
        width: width,
        height: height
    };

    console.log(rawImageData)

    const jpegImageData = jpeg.encode(rawImageData, 50)

    console.log(jpegImageData)

    return jpegImageData;
}

const writeFile = encodedPic => {
    fs.writeFileSync('./media/processed-pic.jpeg', encodedPic.data, 'base64')
}

// console.log(encodeJPEG(rawColorMap))
writeFile(encodeJPEG(rawColorMap))