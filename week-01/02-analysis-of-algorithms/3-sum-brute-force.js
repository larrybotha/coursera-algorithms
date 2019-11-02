// threeSum :: int[] -> int
const threeSum = xs => {
  const {length} = xs;
  let count = 0;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      for (let k = 0; k < length; k++) {
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
