const k = require('../lib/kmeans');
const data = require('./rawPixelData');
const distance = require('../lib/distanceFormula');

const _ = require('lodash');

const ecluidDistance = distance.distanceFormula
const rawPixelData = data.rawPixelData;
const kmeans = k.kmeans;

const initialKmeans = kmeans(4);



const pixelDistanceToK = kArray => {
  const distanceArray = [];

  for (let i = 0; i < rawPixelData.length; i++) {
    distanceArray[i] = {};
    distanceArray[i].pixel = {
      number: i,
      distanceToK: []
    }
    for (let j = 0; j < initialKmeans.length; j++) {
      distanceArray[i].pixel.distanceToK.push({
        n: {
          d: ecluidDistance(rawPixelData[i].r, initialKmeans[j].r, rawPixelData[i].g, initialKmeans[j].g, rawPixelData[i].b, initialKmeans[j].b),
          k: j
        }
      })
    }
    distanceArray[i].pixel.shortestDist = _.minBy(distanceArray[i].pixel.distanceToK, o => o.n.d)
  }
  
  return distanceArray;
}

const groupPixelsByDistanceToK = distanceArray => {
  const clusters = {}

  for (let i = 0; i < distanceArray.length; i++) {
    let kName = distanceArray[i].pixel.shortestDist.n.k
    if (!clusters[kName]) {
      clusters[kName] = [];
    }

    clusters[kName].push(distanceArray[i])
  }

  return clusters;

}

// console.log(pixelDistanceToK(initialKmeans)[99].pixel.shortestDist)
// console.log(_.minBy(pixelDistanceToK(initialKmeans)[99].shortestDist))
console.log(groupPixelsByDistanceToK(pixelDistanceToK(initialKmeans)))
