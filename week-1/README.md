# Coursera Algorithms: Week 1 - Union Find

[Lecture slides](https://www.coursera.org/learn/algorithms-part1/supplement/JgDHB/lecture-slides)

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
- [Quick-union (lazy approach)](#quick-union-lazy-approach)
  - [Evaluation of quick union](#evaluation-of-quick-union)
- [Quick-Union Improvements](#quick-union-improvements)
  - [Improvement 1: weighting](#improvement-1-weighting)
    - [Weighted quick-union analysis](#weighted-quick-union-analysis)
    - [Proof](#proof)
  - [Improvement 2: path compression](#improvement-2-path-compression)
  - [Summary](#summary)

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
- `union`: to merge components containing `p` and `q`, change all entries whose
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

## Quick-union (lazy approach)

Quick-find is too slow because of array iteration. An alternative is
quick-union which uses a lazy approach; we try avoid doing work until we have
to.

Quick-union has the following data structure:

- integer array `id[]` of size N
- interpretation: `id[i]` is parent of `i`
- root of `i` is `id[id[id[...id[i]...]]]`
    - each item in the array can be thought of as representing an set of trees,
        a forest
    - each entry in the array is going to contain a reference to its parent in
        the tree

```
# we have the array with ids of parents
      0   1   2   3   4   5   6   7   8   9
id[]  0   1   9   4   9   6   6   7   8   9

0   1     9       6   7   8
        /   \     |
      2       4   5
              |
              3
```

Every item has a root, and singular components point to themselves.

i.e. the root of 3 is 9, and the root of 5 is 6

```
connected(3, 5)
// => false, they do not share the same root
```

- `find`: check if `p` and `q` have the same root
- `union`: to merge components containing `p` and `q`, set the id of `p`s root
    to the id of `q`s root. This requires only 1 operation, as opposed to
    iterating over the full array of objects

e.g. for `union`:

```
      0   1   2   3   4   5   6   7   8   9
id[]  0   1   9   4   9   6   6   7   8   9

union(3, 5)

# result
      0   1   2   3   4   5   6   7   8   9
id[]  0   1   9   4   9   6   6   7   8   6
                                          ^

# or, visually

0   1            6       7   8
               /   \
             9      5
           /   \
          2     4
                |
                3
```

[quick-union.js](./quick-union.js)

### Evaluation of quick union

- cost model: number of array accesses (read or write)

    ```
    | algorithm   | initialize | union | find |
    | quick-find  | N          | N     | 1    |
    | quick-union | N          | N     | N    |
    ```

    We have `N` for union and find because of our `while` loop, thus,
    quick-union is also too slow.
- defects:
    - quick-find
      - union is too expensive because we have `N` array accesses
      - trees are flat, but it's too expensive to keep them flat
    - quick-union
      - trees can get tall
      - find is expensive; we could have `N` array accesses. If we had a long
          tree, and requested an item all the way at the bottom, we'd have to
          traverse all of its parents in order to determine the root

## Quick-Union Improvements

Neither quick-find nor quick-union are fast enough.

### Improvement 1: weighting

[quick-find-weighted.js](./quick-union-weighted.js)

Weighted quick-union:

- modify quick-union to avoid tall trees
- keep track of the size of each tree (number of objects in tree)
- balance the tree by linking the root of the _smaller_ tree to the _larger_
    tree
    - a reasonable alternative is to use height or rank to union


We'll look at the same union for quick-union and weighted quick-union

```
# the following graph will be the same for either strategy
      0   1   2   3   4   5   6   7   8   9
id[]  0   1   9   3   9   6   6   7   8   9

0   1   3    9       6   7   8
           /   \     |
         2       4   5

union(2, 5)

# result quick-find; set root of 2 to root of 5
      0   1   2   3   4   5   6   7   8   9
id[]  0   1   9   3   9   6   6   7   8   6
                                          ^

0   1   3        6       7   8
               /   \
             9      5
           /   \
          2     4

# result quick-union; set root of smaller tree to root of larger tree
      0   1   2   3   4   5   6   7   8   9
id[]  0   1   9   3   9   6   9   7   8   9

0   1   3    9       7   8
           / | \
         2   4   6
                 |
                 5
```

Weighted quick-union has the following data structure:

- same structure as quick-union, with the addition of a `sz[i]` array holding
    the size of each root at `i`
- `find`: check if `p` and `q` have the same root
- `union`:
    - link root of smaller tree to root of larger tree
    - update `sz[i]` array

#### Weighted quick-union analysis

- running time:
    - `find`: takes time proportional to depth of `p` and `q` (lg N where lg
        represents log2)
    - `union`: takes constant time, given roots

We propose that for `find`, the depth of any node `x` is at most ln N, where N
is the total number of objects in the data structure.

#### Proof

When does the depth of `x` increase?

- `x` increases by 1 when tree T1 containing `x` is merged into another tree T2
- the size of the tree containing `x` at least doubles since |T2| >= |T1|
- the size of the tree containing `x` can double at most lg N times
    - this is because any tree with depth `sqrt(N)` can only have new trees added
        at its root. The sum of all of those trees weights cannot exceed the
        total number of items in the data structure, so the tree will never get
        taller than `sqrt(N)`

Thus, we have the following performance table:

    | algorithm            | initialize | union | find |
    | --=                  | ---        | ---   | ---  |
    | quick-find           | N          | N     | 1    |
    | quick-union          | N          | N     | N    |
    | quick-union weighted | N          | lg N  | lg N |

Do we stop here because we've improved performance? No! There's a simple
additional improvement.

### Improvement 2: path compression

[quick-find-path-compression.js](./quick-union-path-compression.js)

Quick-union with path compression: after computing the root of `p`, set the root
of each examined node to that root.

e.g.

```
# without path compression

                      0
                      | \
                      1   2
                    / | \
                  3   4   5
                / |
               6  7
             /   \
            8     9
            |   /   \
           10  11   12


# with path compression; i.e. if finding the root of p, set all of p's parent's
# roots to p's new root

# let p be the node at 9

                    0
                    |
    -----------------------------
    |       |       |     |     |
    9       6       3     1     2
  /   \     |       |   /   \
 11   12    8       7  4     5
            |
           10

```

This will have a constant extra cost:

- we went up the tree once to find the root
- we'll go back up the tree along the same path to flatten it

### Summary

Weighted quick-union with path compression makes it possible to solve problems
that could otherwise not be addressed.

| algorithm                      | worst case time |
| ---                            | ---             |
| quick-find                     | M N             |
| quick-union                    | M N             |
| weighted QU                    | N + M log N      |
| QU + path-compression          | N + M log N      |
| weighted QU + path-compression | N + M lg* N      |

_M union-find operations on a set of N objects_

Example:

- WQUPC reduces time from 30 years to 6 seconds
- a supercomputer won't help much; a good algorithm enables the solution
