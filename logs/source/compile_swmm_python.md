% Using pyswmm in M1
% Abhiram Mullapudi
% December 27, 2021

# pyswmm in M1
pyswmm does not yet officially support M1. This post outlines the compilation procedure of swmm-python locally on M1 Macs. swmm-python acts as an interface between EPA-SWMM's simulation engine and pyswmm. 
We would need this library for running pyswmm in M1 Macs. I would strongly recommend using a python virtual environment for this installation. 


As of Dec 29th, 2021, OpenMP is causing issues with the compilation process. So, for now, I have disabled it. I will update the post once I find a way to compile swmm-python with OpenMP[^1].

Please refer to the cmake file in [https://github.com/abhiramm7/swmm-python/blob/dev/swmm-toolkit/CMakeLists.txt](https://github.com/abhiramm7/swmm-python/blob/dev/swmm-toolkit/CMakeLists.txt)

## swmm-python
```shell
brew install ninja
brew install swig
```

```shell
git clone https://github.com/abhiramm7/swmm-python/tree/dev/swmm-toolkit
cd swmm-toolkit
git submodule update --init --recursive
python -m pip install -r build-requirements.txt
python setup.py build
python setup.py bdist_wheel
python -m pip install dist/swmm_toolkit-0.8.2-cp39-cp39-macosx_11_0_arm64.whl
```

## pyswmm
```shell
python -m pip install pyswmm
```

Notes:

- ninja is a light weight build system: [ninja-build.org](https://ninja-build.org)
- swig is an interface better C/C++ and languages like python: [swig](http://www.swig.org/exec.html)

[^1]: We are technically compiling swmm-solver, which is EPA-SWMM's simulation engine. 

