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

p.open(2, 3);
log(drawGrid(p.getGrid()));
