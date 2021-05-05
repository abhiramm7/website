# Git - worktree

`worktree` enables us to simultaneously work on multiple branches. This eliminates the need to manually switch between branches.  

## Creating a worktree
`bash
mkdir worktree
cd worktree
git worktree add ./<branch name> <branch name>
`

├── worktree
│   ├── branch1
│   ├── branch2
│   ├── branch3
|__ working branch
