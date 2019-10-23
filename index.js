const jpeg = require('jpeg-js');
const fs = require('fs');

const cluster = require('./bin/clusters');
const data = require('./bin/rawPixelData');
// const rawPixelData = data.rawPixelData;
const clusterConvergence = cluster.clusterConvergence;
const picWidth = cluster.width;
const picHeight = cluster.height;

const colorMap = () => {
    const rawPixelData = data.rawPixelData;
    const clusterPixels = clusterConvergence(12, 200);
    const averageClusterColor = [];
    const visColors = [
        {
            r: 255,
            g: 0,
            b: 0,
        },
        {
            r: 0,
            g: 255,
            b: 0,
        },
        {
            r: 0,
            g: 0,
            b: 255,
        },
        {
            r: 255,
            g: 255,
            b: 0,
        },
        {
            r: 0,
            g: 255,
            b: 255,
        },
        {
            r: 255,
            g: 0,
            b: 255,
        },
        {
            r: 235,
            g: 64,
            b: 52,
        },
        {
            r: 190,
            g: 209,
            b: 42,
        },
        {
            r: 20,
            g: 20,
            b: 20,
        },
        {
            r: 255,
            g: 255,
            b: 255,
        },
        {
            r: 252,
            g: 0,
            b: 67,
        },

    ]

    for (let k in clusterPixels) {
        // averageClusterColor.push(clusterPixels[curr].average);
        clusterPixels[k].forEach(curr => {
            averageClusterColor[curr.pixel.number] = visColors[clusterPixels[k][0].pixel.shortestDist.n.k];
            averageClusterColor[curr.pixel.number].a = 255;
        })
    }
    // console.log(averageClusterColor);
    return averageClusterColor;
}

const rawColorMap = colorMap();

const encodeJPEG = rawData => {
    // console.log(rawData.length)

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
        width: picWidth,
        height: picHeight
    };

    // console.log(rawImageData)

    const jpegImageData = jpeg.encode(rawImageData, 50)

    // console.log(jpegImageData)

    return jpegImageData;
}

const writeFile = encodedPic => {
    fs.writeFileSync(`./media/processed-pic-5-20-${Math.floor(Math.random() * 10000000)}.jpeg`, encodedPic.data, 'base64')
}

// console.log(encodeJPEG(rawColorMap))
writeFile(encodeJPEG(rawColorMap))