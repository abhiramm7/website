% Blog Generation 
% Abhiram Mullapudi
% May 8, 2021


### Blog generation with pandoc using a html template

I use pandoc to convert markdown files into static html pages using a template file.

```sh
pandoc --template blog_log_template.html <source.md> -o <target.html>

```
