const {performance, PerformanceObserver} = require('perf_hooks');
const fc = require('fast-check');

const {threeSum} = require('./3-sum-brute-force');
const {createTimer} = require('./create-timer');

const log = (...args) => console.log(...args);

const arrLength = 100;
const numArrays = 10;

const arbLargeIntArr = fc
  .array(fc.integer(), arrLength, arrLength)
  .map(xs => {
    const s = new Set(xs);

    return [...s.values()];
  })
  .filter(xs => xs.length < arrLength);
const xxs = fc.sample(arbLargeIntArr, numArrays);

const handleTimerEntry = entry => {
  const arr = entry[0];
  const iteration = entry[1];
  const {duration, name} = entry;

  log(`${name} iteration: ${iteration}`);
  log(`# items:`, arr.length);
  log(`duration:`, duration);
};

const {wrappedFn: wrappedThreeSum, obs} = createTimer(
  threeSum,
  handleTimerEntry
);

xxs.map((xs, i) => {
  const result = wrappedThreeSum(xs, i);

  log(`result:`, result);
  log(`========================`);

  if (i === numArrays - 1) {
    obs.disconnect();
  }
});
