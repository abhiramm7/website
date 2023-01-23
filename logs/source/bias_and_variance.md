% bias-variance trade-off
% Abhiram Mullapudi
% January 8, 2023


## Bias and Variance
Bias-Variance trade-off is used to quantify the efficiency of statistically-driven regression models.
In this post, I define the bias-variance trade-off and demonstrate it use for evaluating regression methodologies.

\

#### Bias
**Bias** of an estimator is defined as follows: let $T$ be a statistic used to estimate $\theta$, and $E(T)$ is the expected value of T. Then, 
$$
bias(T; \theta) = E(T) - \theta
$$
If the $bias(T)$ is 0, then $T$ is said to be an unbiased estimator of $\theta$[^1]. 

\

#### Variance
**Variance** of random variable $X$ is defined as
$$
var(X) = E[(X - E[X]))^2]
$$
Where $E[X]$ is the expected value of random variable $X$. The above equation can be further simplified as,
$$
\begin{align}
var(X) &= E[(X - E[X]))^2] \\
&= E[ (X^2 +  E[X]^2 - 2XE[X]) ] \\
&= E[X^2] + E[E[X]^2] - 2E[XE[X]] \\
&= E[X^2] + E[X]^2 - 2E[X]E[X] \\
&= E[X^2] - E[X]^2
\end{align}
$$

\

Before we see how bias and variance can help us evaluate regression models, let us formally define regression. 

\

#### Regression Model
Given a dataset $D_{0:N}:\{x_{0:N}, y_{0:N}\}$, a regression model, $f$, aims to estimate $y_i$ based on $x_i$ with error $\epsilon \sim N(0, \sigma^2)$. Let $\mathbf{x}$ and $\mathbf{y}$ represent the vectors of elements in dataset $D$. Then,
$$
\begin{equation}
\mathbf{y} = f(\mathbf{x}) + \epsilon \\
\end{equation}
$$

#### Regression error

$$
\begin{align}
MSE &= E[(\hat{y} - y)^2] \\
&= E[(\hat{y} + \bar{y} - \bar{y} + y)^2] \\
&= E[(\hat{y} + \bar{y})^2 + (\bar{y} + y)^2 - 2(\hat{y} + \bar{y})(\bar{y} + y)] \\
&= E[(\hat{y} + \bar{y})^2 + (\bar{y} + y)^2 - 2(\hat{y} + \bar{y})(\bar{y} + y)] \\
&= Variance + Bias + Noise
\end{align}
$$


[^1]: There are multiple bias, see [wikipedia.org/bias](https://en.wikipedia.org/wiki/Bias_(statistics)) for more information.
