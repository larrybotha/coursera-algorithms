const {performance, PerformanceObserver} = require('perf_hooks');
const fc = require('fast-check');

const {threeSum} = require('./3-sum-brute-force');
const {createTimer} = require('./create-timer');

const log = (...args) => console.log(...args);

const arrLength = process.argv[2] ? parseInt(process.argv[2], 10) : 200;
const numArrays = 10;

const arbLargeIntArr = fc
  .array(fc.integer(), arrLength, arrLength * 2)
  .map(xs => {
    const s = new Set(xs);

    return [...s.values()];
  })
  .map(xs => xs.slice(0, arrLength))
  .filter(xs => xs.length === arrLength);
const xxs = fc.sample(arbLargeIntArr, numArrays);

let durations = [];

const handleTimerEntry = entry => {
  const arr = entry[0];
  const iteration = entry[1];
  const {duration, name} = entry;
  const durationInSeconds = duration / 1000;

  durations = durations.concat(durationInSeconds);

  log(`${name} iteration: ${iteration}`);
  log(`# items:`, arr.length);
  log(`duration: ${durationInSeconds}s`);
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

const avgDuration = (
  durations.reduce((acc, x) => acc + parseFloat(x, 10), 0) / numArrays
).toPrecision(3);

log(`avg duration: ${avgDuration}s`);
