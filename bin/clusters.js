const k = require('../lib/kmeans');
const data = require('./rawPixelData');
const distance = require('../lib/distanceFormula');

const _ = require('lodash');

const ecluidDistance = distance.distanceFormula
const rawPixelData = data.rawPixelData;
const width = data.width;
const height = data.height;
const kmeans = k.kmeans;

const initialKmeans = kmeans(4);

const pixelDistanceToK = kArray => {
  const distanceArray = [];

  for (let i = 0; i < rawPixelData.length; i++) {
    distanceArray[i] = {};
    distanceArray[i].pixel = {
      number: i,
      value: {...rawPixelData[i]},
      distanceToK: []
    }
    for (let j = 0; j < kArray.length; j++) {
      distanceArray[i].pixel.distanceToK.push({
        n: {
          d: ecluidDistance(rawPixelData[i].r, kArray[j].r, rawPixelData[i].g, kArray[j].g, rawPixelData[i].b, kArray[j].b),
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

const averageClusterPixelValue = clusters => {
  let red;
  let green;
  let blue;

  // Add average object to each k in cluster object
  for (let k in clusters) {
    clusters[k].average = {}
  }
  // Calculate average r, g, b values of each cluster k array
  for (let k in clusters) {
    // console.log(clusters[k][0].pixel.value)
    clusters[k].average.r = Math.round(clusters[k].reduce((acc, curr) => {
      // console.log(curr.pixel.value.r)
      return acc + curr.pixel.value.r
    }, 0) / clusters[k].length)
    clusters[k].average.g = Math.round(clusters[k].reduce((acc, curr) => {
      // console.log(curr.pixel.value.g)
      return acc + curr.pixel.value.g
    }, 0) / clusters[k].length)
    clusters[k].average.b = Math.round(clusters[k].reduce((acc, curr) => {
      // console.log(curr.pixel.value.b)
      return acc + curr.pixel.value.b
    }, 0) / clusters[k].length)
  }
  return clusters
}

const recalibrateKmeans = clusters => {
  const kmeansList = [];
  let i = 0;
  for (let k in clusters) {
    kmeansList.push(clusters[k].average)
    clusters[k].average.k = i;
    i++
  }
  return kmeansList
}

// const avg = groupPixelsByDistanceToK(pixelDistanceToK(initialKmeans));
// const avgClusterValues = averageClusterPixelValue(avg);

// console.log(pixelDistanceToK(initialKmeans)[99].pixel.shortestDist)
// console.log(_.minBy(pixelDistanceToK(initialKmeans)[99].shortestDist))
// console.log(groupPixelsByDistanceToK(pixelDistanceToK(initialKmeans)))
// console.log(avg[0][0].pixel)
// console.log(initialKmeans)
// console.log(averageClusterPixelValue(avg))

// console.log(recalibrateKmeans(avgClusterValues))

const clusterConvergence = (kSize, iterations) => {
  let kMeansList = kmeans(kSize);
  let clusters;
  let avg

  for (let i = 0; i < iterations; i++) {
    avg = groupPixelsByDistanceToK(pixelDistanceToK(kMeansList));
    clusters = averageClusterPixelValue(avg);
    kMeansList = recalibrateKmeans(clusters)
    // console.log(kMeansList)
  }

  for (let i in clusters) {
    console.log(clusters[i].average)
  }
  return clusters

}

module.exports = {
  clusterConvergence,
  rawPixelData,
  width, 
  height,
}
