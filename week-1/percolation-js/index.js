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

  const getId = (row, col) => {
    if (row < 1 || col < 1) {
      throw `Out of bounds, (${row}, ${col}) may not be less than 1`;
    }

    if (row > n || col > n) {
      throw `Out of bounds, (${row}, ${col}) may not be greater than ${n}`;
    }

    return (row - 1) * n + (col - 1);
  };

  // open :: int -> int -> void
  const open = (row, col) => {
    const id = getId(row, col);

    grid[id] = true;

    for (let r = row - 1; r < row + 2; r++) {
      for (let c = col - 1; c < col + 2; c++) {
        if (r > 0 && c > 0 && r < n + 1 && c < n + 1 && isOpen(r, c)) {
          qu.union(id + 1, getId(r, c) + 1);
        }
      }
    }
  };

  // isOepn :: int -> int -> boolean
  const isOpen = (row, col) => {
    const id = getId(row, col);

    return Boolean(grid[id]);
  };

  // isFull :: int -> int -> boolean
  const isFull = (row, col) => {
    const id = getId(row, col);

    return qu.connected(0, id + 1);
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
