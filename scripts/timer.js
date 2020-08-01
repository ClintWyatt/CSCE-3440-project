/* This could be used to auto update the user interface to show changes

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function timer(ms) {
  for (let i = 0; i < 5; i++) {
    await sleep(ms);
    console.log("HERE!");
  }
}
*/