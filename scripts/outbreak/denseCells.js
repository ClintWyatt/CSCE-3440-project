//will randomly pick one of the population-dense cells
function pickRandomDenseCell() {
  return denseCells[generateNumber(0, denseCells.length - 1)];
}

//represents certain population-dense cells in the map
var denseCells = [
  3747,
  2917,
  3480,
  2165,
  1602,
  1603,
  2567,
  2163,
  1271,
  1191,
  1430,
  1667,
  1587,
  3503,
  2618,
  1336,
  1968,
  1003,
  1786,
  1537,
  973,
  3317,
  2984,
  1976,
  1272,
  1033,
  953,
  3248,
];
