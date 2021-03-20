\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{my_cv}[2019/01/01 CV Class]
\LoadClass{article}
\usepackage{graphicx}
\usepackage{float}

% Design header and footer
\usepackage{fancyhdr}
\usepackage{lastpage}
\pagestyle{fancy}
\fancyhf{}
\fancypagestyle{plain}{%
  \fancyhf{}%
  \rfoot[C]{\footnotesize page \thepage\ of \pageref{LastPage}}%
}
\renewcommand{\headrulewidth}{0pt}
\rhead{Mullapudi, CV}
\rfoot{page \thepage\ of \pageref{LastPage}}
\lfoot{Last updated on \today}

% Set Global Fonts 
\usepackage{fontspec}
\setmainfont{Avenir}[
  UprightFont=* Book,             % or Light
  ItalicFont=* Book Oblique,      % or Light Oblique
  BoldFont=* Black,               % or Medium
  BoldItalicFont=* Black Oblique, % or Medium Oblique
]

%\usepackage[margin=1in]{geometry}
\usepackage{bibentry}
\usepackage{tabularx}
\usepackage{multicol}

% Set up hyperref linking
\usepackage[implicit=false]{hyperref}
\usepackage{xcolor}
\definecolor{PrussianBlue}{HTML}{3c70a4}
\definecolor{Test}{HTML}{ff6f5e}
\hypersetup{
    colorlinks=true,
    linkcolor=PrussianBlue,
    filecolor=magenta,      
    urlcolor=PrussianBlue,
}

% Modify section titles 
\RequirePackage{titlesec}
\titleformat{\section}         % Customise the \section command 
  {\bfseries\center}           % Make the \section headers large (\Large),
  {}
  {0em}                      % Can be used to give a prefix to all sections, like 'Section ...'
  {\titlerule \vspace{1mm}}                           % Can be used to insert code before the heading
  []                 % Inserts a horizontal line after the heading

\titleformat{\subsection}
  {\raggedright}
  {}{0em}
  {}
  []

% Dated section for components 
\newcommand{\datedsection}[2]{%
  \section[#1]{#1 \hfill #2}%
}
\newcommand{\datedsubsection}[3]{%
  \subsection[#1]{#1 \hfill #2}{#3}%
}

% Name and contact details
\newcommand{\name}[3]{\noindent{\Huge{#1}} \\ Web : \href{https://#2}{\textbf{#2}}\\ Email : #3} 
