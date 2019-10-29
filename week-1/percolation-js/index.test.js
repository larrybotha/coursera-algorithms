const {percolation} = require('./index');

const log = (...args) => console.log(...args);

const p = percolation(10);

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
    .map(ys => ys.map(y => (y === false ? 'x' : 'o')).join(' '))
    .join('\n');

  return grid;
};

p.open(1, 7);
p.open(2, 7);
p.open(2, 8);
log(drawGrid(p.getGrid()));
log(p.isFull(2, 7));
