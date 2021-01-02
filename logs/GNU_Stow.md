% Dotfile management: GNU Stow
% Abhiram Mullapudi
% January 2, 2020

## GNU Stow

GNU stow is symlink manager that links data (e.g., `.vimrc`, `.zshrc`, or any file for that matter) in the system into a single directory.

### Installation

`
brew install stow
`

### Using `stow`

1. Create a directory for dotfiles

`
mkdir dotfiles
cd dotfiles
`

2. Create directories for storing `.rc` files.

`
mkdir vim
`

3. Move `.rc` files into `dotfiles` directory

`
mv .vimrc <path to dotfiles>/vim/
`

4. Symlink files

`
stow -v -R -t $HOME <path to dotfiles>/vim
`

* `-v` flag indicates verbose
* `-R` is recursive
* `-t $HOME` is target directory where we the symlinked file to appear
* `<path to dotfiles>/vim` is where the actual file is located

### References
1. [GNU Stow Manual](https://www.gnu.org/software/stow/manual/stow.pdf)
2. [writingco.de/blog/how-i-manage-my-dotfiles-using-gnu-stow/](https://writingco.de/blog/how-i-manage-my-dotfiles-using-gnu-stow/)
