const {percolation} = require('./index');

const log = (...args) => console.log(...args);
const n = 20;
const p = percolation(n);

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const drawGrid = xs => {
  const {length} = xs;

  const grid = xs
    .reduce((acc, x) => {
      const rowIndex =
        !acc[acc.length - 1] || acc[acc.length - 1].length === Math.sqrt(length)
          ? acc.length
          : acc.length - 1;
      const row = acc[rowIndex] || [];

      row.push(x);
      acc[rowIndex] = row;

      return acc;
    }, [])
    .map(ys => ys.map(y => (y === false ? '•' : '·')).join(' '))
    .join('\n');

  return grid;
};

const loop = () => {
  setTimeout(() => {
    const randRow = randInt(1, n);
    const randCol = randInt(1, n);
    console.clear();

    p.open(randRow, randCol);

    const percolates = p.percolates();
    const numOpen = p.numberOfOpenSites();

    log(drawGrid(p.getGrid()));
    log(`percolates: ${percolates}`);
    log(`num open: ${numOpen} of ${n ** 2}`);
    log(`threshold: ${numOpen / n ** 2}`);

    if (!percolates) {
      loop();
    }
  }, 25);
};

loop();
