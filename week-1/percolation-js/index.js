const {quickUnionWPc} = require('../quick-union-weighted-path-compression');

const percolation = n => {
  const grid = [];
  const ids = [];

  for (let i = 0; i < n ** 2; i++) {
    ids[i] = i;
    grid[i] = false;
  }

  const getId = (row, col) => (row - 1) * (n - 1) + col;

  // open :: int -> int -> void
  const open = (row, col) => {
    const id = getId(row, col);

    grid[id] = true;
  };

  // isOepn :: int -> int -> boolean
  const isOpen = (row, col) => {
    const id = getId(row, col);

    return Boolean(grid[id]);
  };

  // isFull :: int -> int -> boolean
  const isFull = (row, col) => {
    const id = getId(row, col);

    return !Boolean(grid[id]);
  };

  // numberOfOpenSites :: () -> int
  const numberOfOpenSites = () => grid.filter(Boolean).length;

  // percolates :: () -> boolean
  const percolates = () => {};

  // getGrid :: () => boolean[]
  const getGrid = () => grid;

  return {
    getGrid,
    isFull,
    isOpen,
    numberOfOpenSites,
    open,
    percolates,
  };
};

module.exports = {percolation};
