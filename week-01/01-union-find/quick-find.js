const quickFind = n => {
  const ids = [];

  for (let i = 0; i < n; i++) {
    ids[i] = i;
  }

  function union(p, q) {
    const idP = ids[p];
    const idQ = ids[q];

    for (let i = 0; i < ids.length; i++) {
      if (ids[i] === idP) {
        ids[i] = idQ;
      }
    }
  }

  function connected(p, q) {
    return ids[p] === ids[q];
  }

  return {
    connected,
    find,
  };
};

module.exports = {quickFind};
