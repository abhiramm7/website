% Blog Generation
% Abhiram Mullapudi
% May 8, 2021


# Blog Generation

This blog uses `Tufte.css` style and is built in markdown.

I use pandoc to convert markdown files into static html pages.

```sh
pandoc -f markdown -t html <markdown file path> -o < html file path> --self-contained --css=<path to css>

```
