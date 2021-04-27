# Petstore

This is a [monorepo](https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/) that sovles the coding task I was given by Varjo.

##  URLs

| name      | url                                                          | desc                            | status |
| --------- | ------------------------------------------------------------ | ------------------------------- | ------ |
| prod app  | <https://zilahirpetstore.netlify.app/>                       | the main application            | ✅     |
| storybook | <https://petstore-storybook.netlify.app/>                    | storybook of the React frontent | ✅     |
| API dev   | <https://iotpg5dv56.execute-api.eu-west-1.amazonaws.com/dev> | root API endpoint on DEV        | ✅     |
| API prod  | <https://iotpg5dv56.execute-api.eu-west-1.amazonaws.com/dev> | root API endpoint for PROD      | ⛔     |

## Project structure

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
- [`storybook`] with readme's (to demostrate how to write documentation for generic, HOC, reusable components). In an ideal worlds, Storybook has decorators, to provide mock API's, datasheet, etc, for the stories, and their tests.

Example of a basic decorator in storybook [here](https://github.com/zilahir/petstore/blob/master/packages/client/.storybook/decorator.js).

### Storybook

[`Storybook`](https://github.com/storybookjs/storybook) helps keeping the components, and their documentation up to date. It's not just a fancy showoff of components, it also includes their documentatoin, plus it can (and should!) utilizied to do testing on the components. It's perfect for Unit tests, and Snapshot tests.

- [`ESLint`] (to avoid writing bad code, and enforce coding style within a _team_ (aks: myself))
- [`JSDOC`] (to enforce documentation on functions, and closures (React Hooks))
- [`husky`] husky makes the usage of git hooks easy
- [`lint-staged`] combined with `husky`, it lints the git staged files, and fails, if the linting failes. This prevents badly formatted code to the git repo. It can also executes tests, and any scripts.

> NOTE: I did not utilze this for the bacekend. I did it for demonstrating purposes on the frontend. :)

For example:

```text
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

##  Deployment

###  Frontend

The [client](https://zilahirpetstore.netlify.app/) and the relaated [storybook](https://petstore-storybook.netlify.app/) are static website (SPA), deployed using [Netfliy](netlify.com).

#### Styleing

Currently I am favoruing `SCSS Modules` and `styled-components`. I live styled-components, becasue I can avoid inline-styles, that depends on some UI logic, a variable. If i want to help myself in the future, and keep in mind the evolving the UI, the inline styles are the first to avoid.

Example:

```javascript
const PreviewImage = styled.img`
    backgrond-image: `${props => props.bgImage}`
`
```

###  Backend

The backend is deploy via [serverless](https://www.serverless.com/), and it's deployed into an [`AWS Lambda`](https://aws.amazon.com/lambda/) function.

##  CI / CD

Due to simplicity for this project, both 3 subprojects are deployed in the same time, if a commit is pushed to the `master` branch, using [Github actions](https://docs.github.com/en/actions).

## Dataase

The database is a [MongoDB] instance, hosted on [`MongoDB Atlas`](https://cloud.mongodb.com/).

## Backend

The backend is written in `NodeJS` using `express.

### Test

To demonstraate testing in nodejs world, I have been using `Jest`.

The testcases can be found at `packages/server/tests`

All the tests are passing:

```text
➜  server git:(master) ✗ yarn test
yarn run v1.22.10
$ jest
 PASS  tests/dummy.test.ts (18.623 s)
 PASS  tests/tag.test.ts (43.384 s)
 PASS  tests/category.test.ts (52.91 s)
 PASS  tests/user.test.ts (66.229 s)
 PASS  tests/pet.test.ts (70.902 s)
 PASS  tests/store.test.ts (71.414 s)
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
- [x] Setup Production Environment
- [x] Setup CI/CD Pipelines

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
