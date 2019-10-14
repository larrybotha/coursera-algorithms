const client = (unionFind, numObjects, pairsArray) => {
  const unionFind = unionFindFn(numObjects);

  for (let i = 0; i < pairsArray.length; i++) {
    const [a, b] = pairsArray[i];

    if (!unionFind.connected(a, b)) {
      unionFind.union(a, b);

      console.log(`${a} ${b}`);
    }
  }
};

module.exports = {client};
