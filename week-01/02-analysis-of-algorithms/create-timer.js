const {performance, PerformanceObserver} = require('perf_hooks');

const createTimer = (fn, callback) => {
  const wrappedFn = performance.timerify(fn);
  const obs = new PerformanceObserver(list => {
    const perfEntry = list.getEntries().find(Boolean);

    callback(perfEntry);
  });
  obs.observe({entryTypes: ['function']});

  return {
    wrappedFn,
    obs,
  };
};

module.exports = {createTimer};
