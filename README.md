# Petstore

This is a _monorepo_ that sovles the coding task I was given by Varjo.

Project structure

```text
petstore
└── packages
    ├── client
    │   ├── public
    │   └── src
    │       ├── api
    │       ├── assets
    │       │   └── images
    │       ├── components
    │       │   ├── Header
    │       │   ├── PetGrid
    │       │   └── common
    │       ├── pages
    │       │   ├── DashBoard
    │       │   ├── Home
    │       │   ├── Inventory
    │       │   ├── LogOut
    │       │   ├── Login
    │       │   └── Register
    │       ├── store
    │       │   ├── actions
    │       │   └── reducers
    │       ├── stories
    │       │   ├── assets
    │       │   └── markdowns
    │       ├── styles
    │       │   ├── misc
    │       │   └── mixins
    │       ├── tests
    │       ├── types
    │       └── utils
    └── server
        ├── REST
        ├── config
        ├── dist
        │   ├── books
        │   │   ├── controllers
        │   │   └── models
        │   ├── config
        │   ├── packages
        │   │   └── server
        │   └── src
        │       ├── borrow
        │       ├── controllers
        │       ├── file
        │       ├── middleware
        │       ├── models
        │       ├── routes
        │       ├── types
        │       └── utils
        ├── src
        │   ├── controllers
        │   ├── file
        │   │   ├── controllers
        │   │   └── models
        │   ├── middleware
        │   ├── models
        │   ├── routes
        │   │   └── api
        │   ├── types
        │   └── utils
        └── tests
            └── utils
```

So the project is defined to 2 different `yarn` workspaces:

- client
- server

## Client

The client is bootsrapped with `create-react-app`. The clinet is using the following project structure:

### Structure

```text
    ├── api
    ├── assets
    ├── components
    ├── pages
    ├── store
    ├── stories
    ├── styles
    ├── tests
    ├── types
    └── utils
```

The components are devided into `common` and generic. The `common` contains the reusable components, sch as `Button`, and `Modal`.

### Implementation

Some thoughts of the implementation of the frontned;

The following tools, and ututilites has been introduced:

- [`redux`]
- [`redux-persist`] (to demonstrate how to handle JWT on the frontends side for request, alongside with the authorized user object)
- [`storybook`] with readme's (to demostrate how to write documentation for generic, HOC, reusable components)
- [`ESLint`] (to avoid writing bad code, and enforce coding style within a _team_ (aks: myself))
- [`JSDOC`] (to enforce documentation on functions, and closures (React Hooks))
- [`husky`] husky makes the usage of git hooks easy
- [`lint-staged`] combined with `husky`, it lints the git staged files, and fails, if the linting failes. This prevents badly formatted code to the git repo. It can also executes tests, and any scripts.

> NOTE: I did not utilze this for the bacekend. I did it for demonstrating purposes on the frontend. :)

For example:

```
 Preparing...
✔ Running tasks...
✔ Applying modifications...
✔ Cleaning up...
✨  Done in 0.74s.
✨  Done in 1.14s.
[master b1fa557] added git husky for client
 6 files changed, 2886 insertions(+), 130 deletions(-)
 create mode 100644 .husky/.gitignore
 create mode 100755 .husky/pre-commit
➜  petstore git:(master) git push
```

## TODOs

### Global

- [x] Setup Monorepo
- [x] Setup Backend
- [x] Setup Frontend
- [x] Setup StoryBook
- [x] Setup ESLint for Backend
- [x] Setup ESLint for Frontend
- [x] Setup Prettier for Frontend
- [x] Setup StyleLint for Frontend
- [x] Setup JSDoc for Backend
- [x] Setup JSDoc for Frontend
- [x] Setup testing for Backend
- [ ] Setup testing for Frontend
- [x] Setup OAuth
- [x] Create Docker for MongoDB
- [x] Setup GIT
- [ ] Setup Semantic Release
- [x] Setup Database(s)
- [ ] Setup Production Environment
- [ ] Create testcases for frontend components
- [ ] Setup CI/CD Pipelines

### Frontend

- [x] fix initial ESLint errors
- [x] setup project structure
- [x] setup redux store
- [x] implement routing
- [x] implement registration form
- [x] implement login form
- [x] implement Home Paage
- [x] implement protected routes
- [ ] add interceptors to axios instance

### Backend

- [x] implement models
- [x] implement POST function for models
- [x] imnplement auth roues
- [x] implement PATCH functions for models
- [x] implement DELETE functions for models
- [x] implement store
