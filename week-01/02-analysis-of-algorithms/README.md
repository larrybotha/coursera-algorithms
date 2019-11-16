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
- [Order-of-Growth Classifications](#order-of-growth-classifications)
  - [Common order-of-growth classifications](#common-order-of-growth-classifications)
  - [Practical implications of order-of-growth](#practical-implications-of-order-of-growth)
  - [Binary search demo](#binary-search-demo)
    - [Binary search: mathematical analysis](#binary-search-mathematical-analysis)
  - [An N^2 log N algorithm for 3-sum](#an-n%5E2-log-n-algorithm-for-3-sum)
    - [Comparing programs](#comparing-programs)
- [Theory of Algorithms](#theory-of-algorithms)
  - [Theory of algorithms](#theory-of-algorithms)
    - [Commonly-used notations in theory of algorithms](#commonly-used-notations-in-theory-of-algorithms)
    - [Theory of algorithms: Example 1](#theory-of-algorithms-example-1)
    - [Theory of algorithsm: Example 2](#theory-of-algorithsm-example-2)
  - [Algoruthm design approach](#algoruthm-design-approach)

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

## Order-of-Growth Classifications

There are only a few functions which determine performance of an algorithm as
input size grows:

- 1
- log N
- N
- N log N
- N^2
- N^3
- 2^N

These functions are sufficient to describe the order of growth of typical
algorithms.

*Note:* Order-of-growth discards leading coefficients.

For algorithms described by a linear function, running time scales linearly with
input size. This is similar for `N log N` algorithms.

These are the algorithms we strive for.

Conversely, if we define an algorithm that is described by `N^2` or anything
larger, we know immediately that that algorithm is going to be problematic for
large  input sizes.

### Common order-of-growth classifications

| order of growth | name         | typical code framework             | description        | example           | T(2N) / T(N) (i.e. doubling test) |
| ---             | ---          | ---                                | ---                | ---               | ---                               |
| 1               | constant     | `a = b + c`                        | statement          | add two numbers   | 1                                 |
| log N           | logarithmic  | `while (N > 1) { N = N / 2; ... }` | divide in half     | binary search     | ~1                                |
| N               | linear       | `for (let i = 0; ...) { ... }`     | loop               | find the maximum  | 2                                 |
| N log N         | linearithmic | see merge sort                     | divide and conquer | mergeSort         | ~2                                |
| N^2             | quadratic    | nested loop                        | double loop        | check all pairs   | 4                                 |
| N^3             | cubic        | double nested loop                 | triple loop        | check all triples | 8                                 |
| 2^N             | exponential  | see combinatorial search           | exhaustive search  | check all subsets | T(N)                              |

### Practical implications of order-of-growth

The only algorithms that can practically solve problems, regardless of
computing power, are those that have orders lower than N^2. This has been true
since the 1970s.

### Binary search demo

[binary-search.js](./binary-search.js)

#### Binary search: mathematical analysis

*Proposition:* Binary search uses at most `1 + lg N` comparisons to search in a
sorted array of size N

*Def.:* T(N) = # compares to binary search in a sorted subarray of size <= N

Binary search recurrence:

```
T(N) <= T(N/2) + 1 for N > 1, with T(1) = 1
          [2]    [    3    ]  [     4     ]
[     1      ]

1 - divide the problem in half
2 - use the left half or right half
3 - when N is greater than 1
4 - if N = 1, then we have our answer


T(N)  <= T(N/2) + 1                 given
      <= T(N/4) + 1 + 1             apply recurrence to first term
      <= T(N/8) + 1 + 1 + 1         apply recurrence to second term
      <= ...
      <= T(N/N) + 1 + 1 + ... + 1   stop applying, T(1) = 1
      <= 1 + lg N
```

### An N^2 log N algorithm for 3-sum

We know that binary search has order of growth `lg N`; we can apply that to
3-sum for a more performant algorithm:

1. sort the N distinct numbers
2. for each pair of numbers `a[i]` and `a[j]`, perform a binary search for
   `-(a[i] + a[j])`. That numner, if in the array, is the solution to a 3-sum

```
input:
30 -40 -20 -10 40 0 10 5

sorted:
-40 -20 -10 0 5 10 30 40

binary search:
(-40, -20)            no result
(-40, -10)            no result
(-40, 0)              40
...
(-40, 40)             0
...
```

*Analysis:* Order of growth is `N^2 log N`

- Step 1: N^2 with insertion sort
- Step 2: N^2 log N with binary search

`N^2 log N` is much less than `N^2` for large `N`

#### Comparing programs

*Hypothesis:* The sorting-based `N^2 log N` algorithm for 3-sum is significantly
faster in practice than the brute force `N^3` algorithm.

3-sum brute force:

| N    | time (seconds) |
| ---  | ---            |
| 1000 | 0.1            |
| 2000 | .8             |
| 4000 | 6.4            |
| 8000 | 51.1           |

3-sum with sorting

| N     | time (seconds) |
| ---   | ---            |
| 1000  | .14            |
| 2000  | .18            |
| 4000  | .34            |
| 8000  | .96            |
| 16000 | 3.67           |
| 32000 | 14.88          |
| 6000  | 59.16          |

*Guiding principle:* Typically, a better order-of-growth is faster in practice

## Theory of Algorithms

The inputs of a program can result in the performance of an algorithm varying
widely. It's useful to analyse algorithms in terms of different inputs.

The performance of an algorithm will always lie somewhere between the input that
results in the best case, and the input that results in the worst case.

Types of analyses:

- Best case: lower bound on cost
    - determined by 'easiest' input
    - provides a goal for all inputs
- Worst case: upper bound on cost
    - determined by 'most difficult' input
    - provides a guarantee all inputs
- Average case: expected cost for random input
    - we require a way to model for a random input
    - this analysis provides a way to predict performance

For brute-force 3-sum we have the following:

| best    | ~ 1/2 N^3 |
| worst   | ~ 1/2 N^3 |
| average | ~ 1/2 N^3 |

For binary search 3-sum we have:

| best    | ~ 1    |
| worst   | ~ lg N |
| average | ~ lg N |

We also need to take into account the client's problem that needs to be solved.
What if the actual data doesn't match the data of the input model?

- we need to understand the input to effectively process it
- approach 1: design for the worst case
- approach 2: randomise, and depend on probabilistic guarantee

### Theory of algorithms

This leads to the theory of algorithms, which has the following goals:

- establish "difficulty" of a problem
- develop "optimal" algorithms

We can meet these goals with the following approaches:

- suppress details in analysis: analyse "to within a constant factor"
- eliminate variability in input model by focusing on the worst case

For an optimal algorithm, we want

- a performance guarantee (to within a constant)
- no algorithm can provide a better performance guarantee

#### Commonly-used notations in theory of algorithms

| notation  | provides                   | example | shorthand for       | used to              |
| ---       | ---                        | ---     | ---                 | ---                  |
| Big Theta | asymptotic order of growth | Θ(N^2)  | 1/2N^2, 10N^2, etc. | classify algorithms  |
| Big Oh    | Θ(N^2) and smaller         | O(N^2)  | 10N^2, 100N, etc.   | develop upper bounds |
| Big Omega | Θ(N^2) and larger          | Ω(N^2)  | 1/2N^2, N^5, etc.   | develop lower bounds |

Big Theta is essentially a way to describe anything that is of the order N^2.

#### Theory of algorithms: Example 1

Goals:

- establish the "difficulty" of a problem
- develop "optimal' algorithms
- e.g. 1-sum = "is there a 0 in the array"

The upper bound of a problm is some specific algorithm:

- e.g. 1-sum brute force: look at every array entry
- runnninng time of the optimal algorithm for 1-sum is `O(N)`

A lower bound is a proof that no algorithm can do better:

- e.g. for 1-sum, we have to examine every N. Any unexamined item may be 0
- the running time for the optimal algorithm for 1-sum is `Ω(N)`

This is proof that for 1-sum we have an optimal algorithm:

- lower bound is equal to upper bound (to within a constant factor)
- e.g. the brute-force algorithm for 1-sum is optimal: its running time is `Θ(N)`

#### Theory of algorithsm: Example 2

Goals:

- establish "difficulty" of a problem
- develop "optimal" algorithms
- e.g. 3-sum

Upper bound: defined by a specific algorithm:

- e.g. brute-force for 3-sum
- running time for the optimal algorithm for 3-sum is `O(N^3)`

but, we found an improved algorithm:

- i.e. runnning time of the optimal algorithm for 3-sum  is `O(N^2 log N)`

Lower bound: proof that no algorithm can do netter

- e.g. we have to examine all entries to solve 3-sum
- the running time for the optimal algorithm for 3-sum is `Ω(N)`

The optimal algorithm for 3-sum is an open problem. Is there a subquadaratic
algorithm or quadratic lower bound for 3-sum? We don't know how difficult it is
to solve the 3-sum problem.

### Algoruthm design approach

This has been a successful strategy for decades in designing algorithms:

- start with a problem
- develop an algorithm
- prove a lower bound
- is there a gap between the lower and upper bound?
    - try to lower the upper bounnd (find a new algorithm), or
    - try to raise the lower bound (more difficult)

Caveats in the context of this course:

- is it overly pessimistic to focus on worst case? We can't pragmatically
    prepare for the worst case. It's more efficient to focus on problems
    specific to the innput
- need better than "to within a constant factor" to predict performance. Instead
    of talking about Big Theta, Oh, and Omega, we'll focus on usinng tilde
    notation.

| notation       | provides                   | example  | shorthand for               | used to                  |
| ---            | ---                        | ---      | ---                         | ---                      |
| tilde notation | leading term               | ~ 10 N^2 | 10 N^2, 10 N^2 + 22 N log N | provide apprximate model |
| Big Theta      | asymptotic order of growth | Θ(N^2)   | 1/2N^2, 10N^2, etc.         | classify algorithms      |
| Big Oh         | Θ(N^2) and smaller         | O(N^2)   | 10N^2, 100N, etc.           | develop upper bounds     |
| Big Omega      | Θ(N^2) and larger          | Ω(N^2)   | 1/2N^2, N^5, etc.           | develop lower bounds     |

It's a common mistake to interpret Big Oh as an approximate model. Research has
shown that it's not a good approximation.

Use tilde notation instead.
