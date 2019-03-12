function flip() {
  return Math.random() >= 0.5;
}

function randomNumber(limit) {
  //params validation
  if (typeof limit !== "number") {
    throw new Error("limit parameter should be a number");
  }

  if (limit === 0) {
    throw new Error("limit parameter should be greater than 0");
  }

  if (limit > 1000000) {
    throw new Error(
      "limit parameter should be less than or equals to 1,000,000"
    );
  }

  // get the number of needed bits to represent the limit number
  const numberOfBits = limit.toString(2).length;
  // get the max int that can be represented within the number of bits, this is the nearest power of two
  const realLimit = Math.pow(2, numberOfBits);
  // the generated number will be within the boundaries of [0, 2^numberOfBits)
  // but we need to scale this range to fit our limits
  const scaleFactor = realLimit / limit;
  // generate an array of random 0's and 1's of numberOfBits length
  const randomBits = Array.from({ length: numberOfBits })
    .map(() => (flip() ? 1 : 0))
    .join("");
  // convert the array into a integer
  const randomInt = parseInt(randomBits, 2);

  // scale down the random number to fit within our range
  return Math.floor(randomInt / scaleFactor);
}

// TESTS

function runSamplingTest(param) {
  const results = {};

  Array.from({ length: 100 }).map(() => {
    var random = randomNumber(param);
    results[random] = results[random] ? results[random] + 1 : 1;
  });

  console.log(`Testing randomNumber function with: ${param}`);
  console.log(results);
}

// sampling tests
runSamplingTest(1);
runSamplingTest(10);
runSamplingTest(500);

//single tests
console.log(randomNumber(1));
console.log(randomNumber(500));
console.log(randomNumber(50000));

// uncomment to see the errros thrown
// console.log(randomNumber());
// console.log(randomNumber({}));
// console.log(randomNumber(1000001));
