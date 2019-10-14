# Coursera Algorithms: Week 1 - Union Find

[Lecture notes](https://d3c33hcgiwev3.cloudfront.net/_b65e7611894ba175de27bd14793f894a_15UnionFind.pdf?Expires=1571011200&Signature=EVZllbjvme9Xh5BTh93rkOCHOPNc1smau0ml3CaGOw2oXFEvCbWu~vqS3jafsqTwA9iGhBqXS-Xy68J8zesSibRL8VgRxMaCpWIQznqBAOgTQKdqT0ush3ljNSdag~vU8V24HQF~aFzK4w-9~KOA7O75xXP1FAjemP6X3~MZ5ws_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Steps to develop a useful algorithm](#steps-to-develop-a-useful-algorithm)
- [Dynamic connectivity](#dynamic-connectivity)
  - [Modeling connections](#modeling-connections)
  - [Implementing operations](#implementing-operations)
  - [Union-find data-type](#union-find-data-type)
  - [Dynamic-connectivity client](#dynamic-connectivity-client)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Steps to develop a useful algorithm

1. model the problem
2. find an algorithm to solve it
3. is it fast enough? does it fit in memory?
4. if not, figure out why
5. find a way to address the problem
6. iterate until satisfied

## Dynamic connectivity

[Dynamic connectivity lecture](https://www.coursera.org/learn/algorithms-part1/lecture/fjxHC/dynamic-connectivity)

- is there a path connecting nodes? i.e. boolean result, not "what is the path?"

### Modeling connections

- reflexive: p is connected to p
- symmetric: if p is connected to q, q is connected to p
- transitive: if p is connected to q, and q is connected to r, p is connected to r

Connected components: maximal _set_ of objects that are mutually connected.

```
0

    1
  /
4 - 5

2 - 3
| / |
6   7
```

### Implementing operations

- _find query_: check if two objects are in the same component
- union command_: replace components containing two objects with their union

e.g.

```
# components before union
{0} {1 4 5} {2 3 6 7}

# perform union on 2 and 5
union(2, 5)

# merge two components
{0} {1 4 5 2 3 6 7}
```

or

```
# initial
0

    1
  /
4 - 5

2 - 3
| / |
6   7

# after union(2, 5)
0

    1   2 - 3
  /   /   / |
4 - 5   6   7
```

### Union-find data-type

With the above information, our goal is to define an efficient data structure
for union-find.

We have these considerations:

- number of objects N can be huge
- number of operations M can be huge
- find queries and union commands can be intermixed

Our API will look something like the following:

- `unionFind(n: number)`: initialize data structure with `n` objects
- `union(p: number, q: number): void`: perform a union on 2 objects
- `connected(p: number, q: number): boolean`: are `p` and `p` in the same
    component?
- `find(p: number)`: find component
- `count(): number`: get number of components

### Dynamic-connectivity client

We'll need to evaluate our algorithm. We'll need a client that:

- read in number of objects N from stdio
- repeats the following:
  - read in pair of integers from stdio
  - if they are not connected, connect them and print pair

[dynamic-connectivity-client.js](./dynamic-connectivity-client.js)
