//makes the simulation wait a certain amount before each iteration
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
