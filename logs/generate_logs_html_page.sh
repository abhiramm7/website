#!/bin/bash

# html blog template
html_template="./logs_template.html"
logs_source_dir="./source/"
logs_source_type=".md"
logs_target_dir="./build/"
logs_target_type=".html"
logs_content=("git_worktree" "git_workflows" "gnu_stow" "compile_swmm_python" "blog_generation" "python_background_process" "convolution" "bias_and_variance" "open_water_systems" ":")


#pandoc --template build/template.html ./source/RunPython_BackgroundProcess.md -o ./build/python_background_task.html --mathjax
for log_file in ${logs_content[@]}:
do
	if [ $log_file != "::" ]
	then
		echo "Generating html page for $logs_source_dir$log_file$logs_source_type in $logs_target_dir$log_file$logs_target_type"
		pandoc --template $html_template $logs_source_dir$log_file$logs_source_type -o $logs_target_dir$log_file$logs_target_type --mathjax
	fi
done
