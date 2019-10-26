const quickUnionWeighted = numObjects => {
  const ids = [];
  const sz = [];

  for (let i = 0; i < n; i++) {
    ids[i] = i;
    sz[i] = 1;
  }

  const findRoot = i => {
    let root = i;

    /**
     * if the current value is not equal to the value at that position of our ids
     * array, then we don't have the root
     *
     * i.e. the root of any component is always the item where it references itself
     */
    while (root != ids[root]) {
      ids[root] = ids[ids[root]];
      root = ids[root];
    }

    return root;
  };

  /**
   * use weights to determine which root to link to
   *
   * always link the smaller tree to the root of the larger tree; this ensures
   * the tree doesn't become too tall
   */
  const union = (p, q) => {
    const rootP = findRoot(p);
    const rootQ = findRoot(q);

    if (rootP === rootQ) return;

    if (sz[rootP] < sz[rootQ]) {
      ids[rootP] = rootQ;
      sz[rootQ] += sz[rootP];
    } else {
      ids[rootQ] = rootP;
      sz[rootP] += sz[rootQ];
    }
  };

  /**
   * components are connected if their roots are the same
   */
  const connected = (p, q) => {
    return findRoot(p) === findRoot(q);
  };

  return {
    union,
    connected,
  };
};

module.exports = {quickUnionWeighted};
