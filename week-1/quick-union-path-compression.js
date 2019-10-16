const quickUnion = numObjects => {
  const ids = [];

  for (let i = 0; i < n; i++) {
    ids[i] = i;
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
      /**
       * flatten the tree by setting the root of each intermediate node to the root of
       * its gradnpraent
       */
      ids[root] = ids[ids[root]];
      root = ids[root];
    }

    return root;
  };

  /**
   * set the root of the first object to be the root of the second object
   */
  const union = (p, q) => {
    const rootP = findRoot(p);
    const rootQ = findRoot(q);

    ids[rootP] = rootQ;
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

module.exports = {quickUnion};
