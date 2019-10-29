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

    const adjacentRows = [row - 1, row + 1];
    const adjacentCols = [col - 1, col + 1];

    for (let i = 0; i < adjacentRows.length; i++) {
      const r = adjacentRows[i];

      if (r > 0 && r < n + 1 && isOpen(r, col)) {
        qu.union(id + 1, getId(r, col) + 1);
      }
    }

    for (let i = 0; i < adjacentCols.length; i++) {
      const c = adjacentCols[i];

      if (c > 0 && c < n + 1 && isOpen(row, c)) {
        qu.union(id + 1, getId(row, c) + 1);
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

    return isOpen(row, col) && qu.connected(0, id + 1);
  };

  // numberOfOpenSites :: () -> int
  const numberOfOpenSites = () => grid.filter(Boolean).length;

  // percolates :: () -> boolean
  const percolates = () => {
    return qu.connected(0, n ** 2 + 1);
  };

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
