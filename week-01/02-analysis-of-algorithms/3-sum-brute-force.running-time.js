const {performance, PerformanceObserver} = require('perf_hooks');
const fc = require('fast-check');
const {threeSum} = require('./3-sum-brute-force');

const arrLength = 1000;
const numArrays = 10;

const arbLargeIntArr = fc.array(fc.integer(), arrLength, arrLength);
const xxs = fc.sample(arbLargeIntArr, numArrays);

const wrappedThreeSum = performance.timerify((xs, ...args) => threeSum(xs));

const obs = new PerformanceObserver(xs => {
  const entries = xs.getEntries();
  const perfEntry = entries[0];
  const {duration} = perfEntry;
  const index = perfEntry['1'];

  debugger;
  console.log(`duration arr ${index}:`, duration);

  if (index === numArrays - 1) {
    obs.disconnect();
  }
});
obs.observe({entryTypes: ['function']});

xxs.map((xs, i) => {
  const result = wrappedThreeSum(xs);

  console.log(`result arr ${i}:`, result);
});
