const binarySearch = (xs, value) => {
  let lo = 0;
  let hi = xs.length - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const currVal = xs[mid];

    /**
     * This implementation uses a 3-way comparison, but it's possible to also
     * implement a 2-way comparison
     */
    if (currVal > value) {
      hi = mid - 1;
    } else if (currVal < value) {
      lo = mid + 1;
    } else {
      return mid;
    }
  }

  return -1;
};

module.exports = {binarySearch};
