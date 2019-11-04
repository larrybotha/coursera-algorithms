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
