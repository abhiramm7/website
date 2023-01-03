#!/bin/bash
pandoc --template build/template.html ./source/GIT_worktree.md -o ./build/git_worktree.html --mathjax
pandoc --template build/template.html ./source/blog_generation.md -o ./build/blog_generation.html --mathjax
pandoc --template build/template.html ./source/compile_swmm_python.md -o ./build/compile_swmm_python.html --mathjax
pandoc --template build/template.html ./source/convolution.md -o ./build/convolution.html --mathjax
pandoc --template build/template.html ./source/Git_workflows.md -o ./build/git_workflow.html --mathjax
pandoc --template build/template.html ./source/GNU_Stow.md -o ./build/GNU_Stow.html --mathjax
pandoc --template build/template.html ./source/RunPython_BackgroundProcess.md -o ./build/python_background_task.html --mathjax
