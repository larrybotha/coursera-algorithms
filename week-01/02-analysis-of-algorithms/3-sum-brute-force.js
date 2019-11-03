/**
 * threeSum
 *
 * threeSum :: int[] -> int
 *
 * @param xs - an array of discrete integers
 * @returns count - number of combinations of 3 numbers that sum to 0
 */
const threeSum = xs => {
  const {length} = xs;
  let count = 0;

  // loop over every item
  for (let i = 0; i < length; i++) {
    // getting every item after that item
    for (let j = i + 1; j < length; j++) {
      // and every item after that item
      for (let k = j + 1; k < length; k++) {
        // summing them
        const sum = xs[i] + xs[j] + xs[k];

        if (sum === 0) {
          count++;
        }
      }
    }
  }

  return count;
};

module.exports = {threeSum};
