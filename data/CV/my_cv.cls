\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{my_cv}[2019/01/01 CV Class]
\LoadClass{article}
\usepackage{graphicx}
\usepackage{float}

% Set margins
\usepackage[left=1in,textwidth=5in,marginparsep=0.2in, marginparwidth=2.0in]{geometry}

% Design header and footer
\usepackage{fancyhdr}
\usepackage{lastpage}
\pagestyle{fancy}
\fancyhf{}
\fancypagestyle{plain}{\fancyhf{}\rfoot[C]{\footnotesize page \thepage\ of~\pageref{LastPage}}}
\renewcommand{\headrulewidth}{0pt}
\rhead{Mullapudi, CV}
\rfoot{page \thepage\ of~\pageref{LastPage}}
\lfoot{Last updated on \today}

% Set Global Fonts 
\usepackage{fontspec}
\setmainfont{Avenir}[UprightFont=* Book, ItalicFont=* Book Oblique, BoldFont=* Black, BoldItalicFont=* Black Oblique]

\usepackage{bibentry}
\usepackage{tabularx}
\usepackage{multicol}

% Set up hyperref linking
\usepackage[implicit=false]{hyperref}
\usepackage{xcolor}
\definecolor{PrussianBlue}{HTML}{3c70a4}
\definecolor{Test}{HTML}{ff6f5e}
\hypersetup{colorlinks=true, linkcolor=PrussianBlue, filecolor=magenta,urlcolor=PrussianBlue}

% Modify section titles
\RequirePackage{titlesec}
\titleformat{\section}{\bfseries\center}{}{0em}{\titlerule\vspace{1mm}}[]                 

\titleformat{\subsection}{\raggedright}{}{0em}{}[]

% Dated section for components 
\newcommand{\datedsection}[2]{\section[#1]{#1 \hfill #2}}
\newcommand{\datedsubsection}[3]{\subsection[#1]{#1 \hfill #2}{#3}}

% Name and contact details
\newcommand{\name}[3]{\noindent{\Huge{#1}} \\ web: \href{https://#2}{\textbf{#2}}\\ email: #3}

% Multi Column
\usepackage{multicol}

% Add a margin note
\usepackage{marginnote}
