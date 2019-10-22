const distanceFormula = (r1, r2, g1, g2, b1, b2) => {
  return Math.sqrt(Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2))
}

module.exports = {
  distanceFormula
}