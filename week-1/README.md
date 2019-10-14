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
- [Quick-find [eager approach]](#quick-find-eager-approach)
  - [Evaluation of quick find](#evaluation-of-quick-find)
  - [Quadratic algorithms do not scale](#quadratic-algorithms-do-not-scale)

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
- _union command_: replace components containing two objects with their union

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

## Quick-find [eager approach]

Quick-find has the following data structure:

- integer array of ids, size N
- `p` and `q` are connected iff they have the same id

e.g.

```
object: 0 1 2 3 4 5 6 7 8 9
id:     0 1 1 8 8 0 0 1 8 8

- 0, 5, 6 are connected
- 1, 2, 7 are connected
- 3, 4, 8, 9 are connected

# e.g.
0   1 - 2   3 - 4
|       |   |   |
5 - 6   7   8   9
```

- `find`: check if `p` and `q` have the same id. e.g. `5` and `6` have the same
    id, therefore they're connected
- `union`: to merge components containin `p` and `q`, change all entries whose
    id equals `id[p]` to `id[q]`. e.g.

    ```
    object: 0 1 2 3 4 5 6 7 8 9
    id:     0 1 1 8 8 0 0 1 8 8

    union(1, 6)

    # change all objects with 1's id to 6's id

    object: 0 1 2 3 4 5 6 7 8 9
    id:     1 1 1 8 8 1 1 1 8 8
            ^         ^ ^
    ```

[quick-find.js](./quick-find.js)

### Evaluation of quick find

- cost model: number of array accesses (read or write)

    ```
    | algorithm  | initialize | union | find |
    | quick-find | N          | N     | 1    |
    ```
- defect: union is too expensive

    If we evaluated N objects with the union commands, that would take quadratic
    time, i.e. N^2 time

**Note**: Quadratic time is just too slow and expensive. Quadratic time
algorithms don't scale. As computers get bigger and faster, quadratic algorithms
get slower.

### Quadratic algorithms do not scale

 We have some computer with the following properties:

- can perform 10^9 operations per second
- can hold 10^9 entries in main memory
- i.e. it can access every entry in approximately 1 second

 This is problematic for a quadratic algorithm because:

- if we attempted to access each entry and run a union command on that entry,
    we'd perform 10^18 operations
- this would take roughly 30 years to complete

Quadaratic algorithms don't scale with technology:

- a new computer may be 10x as fast
- that same computer may have 10x as much memory; we'd want to solve a problem
    that is 10x as big
- a quadratic algorithm would be 10x slower
