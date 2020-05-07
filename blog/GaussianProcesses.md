---
title: Gaussian Processes
---

Gaussian Processes
==================



Regression
----------
Consider the problem of classical problem of regression, where given a set of data points $\mathbf{X}, \mathbf{y}$, we want to learn the mapping $f:x \rightarrow y$ so that we can predict the value of the y for the data we have not encountered.
There are two ways we can approach this,

1. Assume a structure of the $f$ and find the parameters that best represent the mapping the given data points.
2. Make no assumptions on the structure of $f$, but rather look at all the possible functions that fit the data assign probabilities based on the likely hood of the function representing the data.

Linear regression, polynomial fit are the best examples of the first approach.
But making such an assumption the structure of mapping, introduces a strong bias. 
Though such an approach is advantageous when we know the relationship between the data-points. 
But in the instances where we have no idea on how the data looks like, such an approach might not be useful.

Simultaneously, there could be infinite functions that map between data points.

$$\mathcal{N}$$
