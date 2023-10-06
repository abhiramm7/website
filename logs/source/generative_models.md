# Generative Models

Generative models are a probability distrubutions.

- Generating timeseries data for simulation and interpoaltion
- We can use genrative models for enabling inference of latent representaions

Taxonamy of generative models

- Explicit Density: Estimates the true pdb or cdf over the sample space
- Implicit Density: It is a stochatic process that generates data directly
    - Direct
    - Markov Chain

It is useful to make a distinction between two types of prob-
abilistic models: prescribed and implicit models (Diggle
and Gratton, 1984). Prescribed probabilistic models are
those that provide an explicit parametric specification of the
distribution of an observed random variable x, specifying a
log-likelihood function log qθ (x) with parameters θ. Most
models in machine learning and statistics are of this form,
whether they be state-of-the-art classifiers for object recog-
nition, complex sequence models for machine translation,
or fine-grained spatio-temporal models tracking the spread
of disease. Alternatively, we can specify implicit probabilis-
tic models that define a stochastic procedure that directly
generates data. Such models are the natural approach for
problems in climate and weather, population genetics, and
ecology, since the mechanistic understanding of such sys-
tems can be used to directly create a data simulator, and
hence the model. It is exactly because implicit models are
more natural for many problems that they are of interest and
importance.


- Tractable Density: 
- Approximate Density
    - Variational
    - Markov Chain


PixelRNN/CNN -> 2016 
Generate images based on a corner pixel.

A lot of it bepends on the first pixel. We can do this for timeseries as well and have rainfall as latent variable.

What is maximum likely hood?

Varional AutoEncoders
- Intractable density function with latent variable

We can use them for qaqc 
