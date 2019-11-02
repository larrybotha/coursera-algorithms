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
