const {quickUnionWPc} = require('../quick-union-weighted-path-compression');

const percolation = n => {
  const grid = [];
  const ids = [];
  let qu;

  for (let i = 0; i < n ** 2; i++) {
    ids[i] = i;
    grid[i] = false;
  }

  /**
   * create union with an additional node before and after our grid
   */
  qu = quickUnionWPc(n ** 2 + 2);

  /**
   * connect the first 10 grid items to the 0 node
   */
  for (let i = 1; i < n + 1; i++) {
    qu.union(0, i);
  }

  /**
   * connect the last 10 grid items to the 0 node
   */
  for (let i = n ** 2 - n + 1; i < n ** 2 + 1; i++) {
    qu.union(i, n ** 2 + 1);
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
    qu,
  };
};

module.exports = {percolation};
