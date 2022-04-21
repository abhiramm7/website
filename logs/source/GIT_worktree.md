% Git Worktree
% Abhiram Mullapudi
% May 6, 2021

## Git - worktree

`worktree` enables us to work on multiple branches simultaneously, eliminating the need to switch between branches manually. Using `worktree`, git branches can be maintained as directories in the local machine.

```
.
└── repository/
    ├── worktree/
    │   ├── dev
    │   ├── testing
    │   └── production
    ├── src
    ├── tests
    └── README.md  
```

Say we are working in the main branch, and we want to access a part of the code in the `dev` branch. Using `worktree`, we can maintain the `dev` branch as a directory in the local machine and modify or access code snippets from it.
Similarly, we can also maintain other branches (e.g., `testing`, `production`) in the local directory.
An example file structure is illustrated above. 

### Creating a worktree

```sh
mkdir worktree
cd worktree
git worktree add ./<branch name> <branch name>
```

