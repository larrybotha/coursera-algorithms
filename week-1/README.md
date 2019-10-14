# Coursera Algorithms: Week 1 - Union Find

[Lecture notes](https://d3c33hcgiwev3.cloudfront.net/_b65e7611894ba175de27bd14793f894a_15UnionFind.pdf?Expires=1571011200&Signature=EVZllbjvme9Xh5BTh93rkOCHOPNc1smau0ml3CaGOw2oXFEvCbWu~vqS3jafsqTwA9iGhBqXS-Xy68J8zesSibRL8VgRxMaCpWIQznqBAOgTQKdqT0ush3ljNSdag~vU8V24HQF~aFzK4w-9~KOA7O75xXP1FAjemP6X3~MZ5ws_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Steps to develop a useful algorithm](#steps-to-develop-a-useful-algorithm)
- [Dynamic connectivity](#dynamic-connectivity)

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

Modeling connections:

- reflexive: p is connected to p
- symmetric: if p is connected to q, q is connected to p
- transitive: if p is connected to q, and q is connected to r, p is connected to r
