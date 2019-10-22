const kmeans = size => {
  let red;
  let green;
  let blue;
  const k = []

  for (let i = 0; i < size; i++) {
    red = Math.floor(Math.random() * 256);
    green = Math.floor(Math.random() * 256);
    blue =  Math.floor(Math.random() * 256);
    k.push({
      r: red,
      g: green,
      b: blue,
      k: i,
    })
  }

  return k

}

module.exports = {
  kmeans
}
