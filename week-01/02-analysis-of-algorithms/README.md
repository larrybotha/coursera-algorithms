# Coursera Algorithms: Week 1 - Analysis of Algorithms

[Lecture slides](https://www.coursera.org/learn/algorithms-part1/supplement/mpK20/lecture-slides)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Introduction](#introduction)
  - [Running time](#running-time)
  - [Reasons to analyse problems](#reasons-to-analyse-problems)
  - [Some algorithmic successes](#some-algorithmic-successes)
    - [Discrete fourier transform](#discrete-fourier-transform)
    - [N-body simulation](#n-body-simulation)
  - [The challenge](#the-challenge)
  - [Scientific method applied to analysis of algorithms](#scientific-method-applied-to-analysis-of-algorithms)
- [Observations of running times of programs](#observations-of-running-times-of-programs)
  - [3-SUM](#3-sum)
    - [Brute force implementation](#brute-force-implementation)
      - [Empirical analysis](#empirical-analysis)
  - [Doubling hypothesis](#doubling-hypothesis)
  - [Experimental algorithmics](#experimental-algorithmics)
    - [System-independent factors](#system-independent-factors)
    - [System-dependent factors](#system-dependent-factors)
- [Mathematical Models](#mathematical-models)
  - [Mathematical models for running time](#mathematical-models-for-running-time)
  - [Cost of basic operations](#cost-of-basic-operations)
  - [Frequency of operations](#frequency-of-operations)
    - [1-sum](#1-sum)
    - [2-sum](#2-sum)
  - [Simplifying calculations](#simplifying-calculations)
    - [Simplifcation 1: Cost model](#simplifcation-1-cost-model)
    - [Simplification 2: tilde notation](#simplification-2-tilde-notation)
      - [Example: 3-sum](#example-3-sum)
  - [Estimating a discrete sum](#estimating-a-discrete-sum)
  - [Summary](#summary)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

We'll look at:

- observations
- mathematical models
- order-of-growth classifications
- theory of algorithms
- memory

We'll consider these different issues from the perspective of different
individuals and groups:

- a _programmer_ who needs to come up with a solution
- a _client_ who wants a problem solved efficiently
- a _theoretician_ who wants to understand the algorithm
- a _team_ who undertake basic blocking and tackling, such as in a classroom
- a _student_ who may need to consider thinking from the role of each of the
    above at one time or another

### Running time

Babbage understood, from his Analytic Engine, that the computation of a problem
would take as long as the number of times one had to turn the crank of the
engine.

This is analagous to how many times an operation has to be performed in order to
get a solution.

### Reasons to analyse problems

- predict performance
- compare algorithms
- provide guarantees
- understand the theoretical basis of the algorithm

The primary practical reason to analyse algorithms is to **avoid performance
bugs**.

Often, a client gets poor performance in an application because the programmer
doesn't understand the performance characteristics.

This course focuses on:

- predict performance
- compare algorithms
- provide guarantees

### Some algorithmic successes

#### Discrete fourier transform

- breaks down a wave of N samples into periodic components
- has allowed DVDs, JPEGs, MRIs, and astrophysics to be developed
- strategies:
    - brute force: N^2 steps
    - FFT algorithm: NlogN steps. This is what has allowed for new technologies
        to be developed

#### N-body simulation

- simulate gravitational interactions among N bodies
- strategies:
    - brute force: N^2 steps
    - Barnes-Hut algorithm: NlogN steps. This has allowed new research to be
        conducted

### The challenge

- will my program be able to solve a large practical input?
- why is my program so slow?
- why does my program run out of memory?

Donald Knuth noted: We can use the scientific method to understand performance.

### Scientific method applied to analysis of algorithms

The scientific method is an effective framework for predicting the performance
of and comparing algorithms.

It is constituted of:

- _Observing_ some feature of the natural world
- _Hypothesising_ a model that is consistent with the observations
- _Predicting_ events using that hypothesis
- _Verifying_ the predictions by making further observations
- _Validating_ by repeating until the hypothesis and observations agree

The scientific method has the following principles:

- experiments must be reproducible
- hypotheses must be falsifiable

## Observations of running times of programs

A natural way to determine the running time of an algorithm is to run the
algorithm repeatedly with larger and larger inputs.

From this one can deduce a function that defines the running time.

### 3-SUM

Given N distinct integers, how many triples sum to exactly zero?

e.g.

```
Given: 30 -40 -20 -10 40 0 10 5
Result: 4
```

Because:

|     | a[i] | a[j] | a[k] | sum |
| --- | ---  | ---  | ---  | --- |
| 1   | 30   | -40  | 10   | 0   |
| 2   | 30   | -20  | -10  | 0   |
| 3   | -40  | 40   | 0    | 0   |
| 4   | -10  | 0    | 10   | 0   |


This is related to many problems in [computational geometry](https://www.wikiwand.com/en/Computational_geometry).

#### Brute force implementation

[3-sum-brute-force.js](./3-sum-brute-force.js)

```bash
# run with arrays of length 100
$ node week-01/02-analysis-of-algorithms/3-sum-brute-force.running-time.js 100
```

##### Empirical analysis

If we were trying to make predictions on phenomena in the natural world, we'd
have limited samples to work with. Extrapolating those data sets to large data
sets would be valuable.

Running the above program with various input sizes, measuring running time, we'd get
the following:

| N    | time (seconds) |
| ---  | ---            |
| 250  | 0.004s         |
| 500  | 0.03s          |
| 1000 | 0.222s         |
| 2000 | 1.76s          |
| 4000 | 11.8s          |
| 8000 | 117s           |

```
          |
       70 |                              •
          |
       60 |
          |
       50 |
 T(N)     |
       40 |
          |
       30 |
          |
       20 |
          |
       10 |              •
          |      •
          ---|---|---|---|---|---|---|---|---|
            1K  2K      4K               8K

                           N
```

This quadratic result is so common in scientific problems, that many data
scientists will plot the values on a [`log-log plot`](https://www.wikiwand.com/en/Log%E2%80%93log_plot),
which very often results in the data being represented by a straight line.

If the data can be represented in a straight line (which may be done via
regression), then we have a power law. We can derive the slope of such a plot, which
is the key to understanding the running time of an algorithm that is represented by
a power law.

In a `log-log plot` the slope of the graph represents the power term in power
laws.

1. power law equation

    ```
    𝑦=𝑎𝑥𝑘
    ```
2. represent it as a log

    ```
    log𝑦=𝑘log𝑥+log𝑎
    ```
3. simplify it

    ```
    𝑦¯=𝑘𝑥¯+𝑐
    ```
4. We thus have:

    - `𝑘`: our gradient in our straight line, which is equivalent to the power term
        in the origin power formula
    - `𝑐`: our interception of the `𝑦` axis, which is the constant in both forms
        of the equation

If we plot our observations plotted on a log plot using _log-log scale_ we get:

we get the following:

```
             102.4 |
                   |             •
              51.2 |
                   |
              25.6 |
                   |
              12.8 |          •
                   |
               6.4 |
                   |
               3.2 |
 lg(T(N))          |
               1.6 |      •
                   |
                .8 |
                   |
                .4 |
                   |
                .2 |
                   |
                .1 |
                   |
               .05 |
                   |  •
              .022 |
                   ---|---|---|---|
                     1K  2K  4K  8K

                          lgN
```

*The key to finding the running time of a algorithm represented by a power law is
the slope of the straight line.*

log(.006) - 2.736965594*log(250) = -8.78492805

- `lg(T(N)) = b lg N + c`
- `b` = 2.999 ()
- `c` = -33.2103
- `T(N) = aN^b` where `a = 2^c` (we use _2_ because we did a log-log plot with a
    base of 2)

From this we get the following hypothesis, which is a good model for the running time
of the program:

```
1.006 * 10^-10 * N ^ 2.999
```

From this we can make predictions:

- 408.1s for N = 16 000

Models help us make predictions without investing in expensive experiments.

### Doubling hypothesis

The doubling hypothesis is a quick way to estimate the slope in a power-law
relationship.

An alternative way to approximate the slope is to find the ratio of the running
times of adjacent observations.

| N    | time (seconds) | ratio          | lg ratio       |
| ---  | ---            | ---            | ---            |
| 250  | 0.004s         |                |                |
| 500  | 0.03s          | 7.5            | 2.737          |
| 1000 | 0.222s         | 7.4            | 2.887          |
| 2000 | 1.65s          | 7.43           | 2.89           |
| ...  | ...            | converges on 8 | converges on 3 |

Hypothesis: The running time is approximately `aN^b` where `b = lg(ratio)`

Caveat: Logarithmic factors cannot be identified with the doubling hypothesis.

Assuming we know `b`, we can solve for `a` by running a sufficiently large value
of `N` and solve for `a`

### Experimental algorithmics

There are factors which affect the running time of an algorithm, some of which
are dependent on the system on which they are running, and others which are
independent of the system.

Only system-independent factors influence the power term (`b`) in the power law
describing the relationship.

Both system-dependent and -independent factors influence the constant (`a`) in
the power law.

#### System-independent factors

- algorithm
- input data

#### System-dependent factors

- hardware, i.e. CPU, memory, cache
- software, i.e. compiler, interpreter, garbage collector
- system, i.e. OS, network, other apps

## Mathematical Models

Observing performance helps predict what will happen, but doesn't explain why
it's happening. Mathematical modeling helps us do that.

### Mathematical models for running time

*Total running time:* sum of cost * frequency of all operations

In order to determine these values, we need to:

- analyze the program to determine the set of operations
- evaluate the machine and compiler as this will affect costs
- determine the frequency by evaluating the algorithm and the data inputs

Donald Knuths _Art Of Programming_ series goes into these models in depth.

### Cost of basic operations

| operation               | example          | nanoseconds† |
| ---                     | ---              | ---          |
| integer add             | a + b            | 2.1          |
| integer multiply        | a * b            | 2.4          |
| integer divide          | a / b            | 5.4          |
| floating-point add      | a + b            | 4.6          |
| floating-point multiply | a * b            | 4.2          |
| floating-point divide   | a / b            | 13.5         |
| sine                    | Math.sine(theta) | 91.3         |
| arctangent              | Math.atan2(y, x) | 129.0        |
| ...                     | ...              | ...          |

† - Mac OS X Macbook Pro 2.2GHz with 2GB RAM

| operation            | example                   | nanoseconds† |
| ---                  | ---                       | ---          |
| variable declaration | `int a`                   | c1           |
| assignment statement | `a = b`                   | c2           |
| integer compare      | `a > b`                   | c3           |
| array element access | `a[i]`                    | c4           |
| array length         | `xs.length`               | c5           |
| 1-D array allocation | `new int[N]`              | c6 * N       |
| 2-D array allocation | `new int[N][N]`           | c7 * N^2     |
| string length        | `str.length`              | c8           |
| substring extraction | `str.substring(N / 2, N)` | c9           |
| string concatenation | `s + t`                   | c10 * N      |

where c[num] is an operation that runs in constant time.

We can see that string concatenation is not constant time; string concatenation
depends on the length of a string.

### Frequency of operations

#### 1-sum

For an algorithm where we return the number of occurrences of 0 from an array of values
of length N, how many instructions are run?

```javascript
let count = 0;

for (let i = 0; i < N; i++) {
  if (xs[i] === 0) {
    count++;
  }
}
```

| operation            | frequency  |
| ---                  | ---        |
| variable declaration | 2          |
| assignment statement | 2          |
| less than comparison | N + 1      |
| equality comparison  | N          |
| array access         | N          |
| increment            | N to 2 * N |


#### 2-sum

Find number of pairs of values that when added together equal 0. How many
instructions are run?

```javascript
let count = 0;

for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    if (xs[i] + xs[j] === 0) {
      count++;
    }
  }
}
```

| operation            | frequency                        |
| ---                  | ---                              |
| variable declaration | N + 2                            |
| assignment statement | N + 2                            |
| less than comparison | 1/2 * (N + 1)(N + 2)             |
| equality comparison  | 1/2 * N * (N - 1)†               |
| array access         | N * (N - 1)                      |
| increment            | 1/2 * N * (N - 1) to N * (N - 1) |

† - equivalent to:

0 + 1 + 2 + ... + (N - 1)
= 1/2 * N * (N - 1)
= N Choose 2

### Simplifying calculations

The above calculations quickly get tedious. Turing noted in 1947 that one can
still get valuable information by simplifying the frequencies, and focusing on
the operations that are most expensive.

#### Simplifcation 1: Cost model

Use some basic operation as a proxy for time.

e.g. in 2-sum problem, array access is the most expensive, so we have the
following for our cost model:

```
N * (N - 1)
```

#### Simplification 2: tilde notation

- estimate running time (or memory) as a function of input size N
- ignore lower order terms
  - when N is large, ignore lower terms
  - when N is small, we don't care, because for small N's running time will
      always be small

e.g.

1/6 N^3 + 20N + 16          ~ 1/6 N^3
1/6 N^3 + 100N^(4/3) + 56   ~ 1/6 N^3
1/6 N^3 + 1/2N^2 + 1/3N     ~ 1/6 N^3

With tilde notation we get the following table:

| operation            | frequency                        | tilde notation |
| ---                  | ---                              | ---            |
| variable declaration | N + 2                            | N              |
| assignment statement | N + 2                            | N              |
| less than comparison | 1/2 * (N + 1)(N + 2)             | 1/2N^2         |
| equality comparison  | 1/2 * N * (N - 1)†               | 1/2N^2         |
| array access         | N * (N - 1)                      | N^2            |
| increment            | 1/2 * N * (N - 1) to N * (N - 1) | 1/2N^2 to N^2  |

##### Example: 3-sum

Approximately how many array accesses are there as a function of input size N?

```javascript
  let count = 0;

  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      for (let k = j + 1; k < length; k++) {
        if (xs[i] + xs[j] + xs[k] === 0) {
          count++;
        }
      }
    }
  }
```

(N * (N - 1) * (N - 2)) / 3! = N Choose 3 ~ 1/6 * N^3

Therefore we have 1/6 * N^3 array accesses

### Estimating a discrete sum

How do we estimate a discrete sum?

- using discrete maths, or
- replace the sum with an integral, and use calculus

e.g. 1

1 + 2 + 3 + ... + N
~ ∑ i
~ ∫ x dx
~ 1/2 * N^2

e.g. 2

1 + 1/2 + 1/3 + ... + 1/N
~ ∑ 1/i
~ ∫ 1/x dx
= ln N

e.g. 3
3-sum triple-loop
~ ∑∑∑ 1
~ ∫∫∫ dx dy dz
~ 1/6 N^3

### Summary

Accurate mathematical models are available.

Not pragmatic to use them, favour approximate models to determine cost instead.
