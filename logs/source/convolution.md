% How I learned to stop worrying and love convolution
% Abhiram Mullapudi
% January 2, 2023

## Convolution

Convolution is a mathematical operation akin to addition or multiplication.
Convolution operation is described by \eqref(1).
It processes on two signals, described by $f$ and $g$, to generate a third new signal.

$$(f * g)(t):=\int_{-\infty}^{\infty} f(\tau) g(t-\tau) d \tau \tag{1}$$

The above equation can be interpreted as flipping $g(t)$ and scanning the $f(t)$.
Convolution operation returns the function that is created by scanning these signals over each other.





