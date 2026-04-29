# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Docker - [Download & Install Docker](https://www.docker.com/get-started/).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Nest.js - [NestJS Introduction](https://docs.nestjs.com/).

## Downloading

```bash
git clone `https://github.com/yurykurouski/nodejs2024Q1-service`
```

## Installing NPM modules

```bash
npm install
```

## How to run in Docker:
- Switch to the branch named `dev_2`
- Create `.env` file regarding to the `.env.example` file
- Run `docker compose up`
- To check for vulnerabilities run `npm run docker:scout` NB!: you have to be registered on [Docker HUB](https://hub.docker.com)
- Run tests by using `npm run test:auth`

## How to check if log files are generated:
#### In case if app running inside of Docker container: 
- navigate to `usr/src/app` and check for the `logs` folder
#### In case if app running locally (NB to run app locally you have to change DB_HOST_NAME env value to localhost an run connect yo your local Postres DB instance!): 
- check for the `logs` folder in the root folder

## Build application locally

```bash
npm run build
```

## Running application

```bash
npm start
```

After build application and starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```bash
npm run test
```

To run only one of all test suites

```bash
npm run test -- <path to suite>
```

To run all test with authorization

```bash
npm run test:auth
```

To run only specific test suite with authorization

```bash
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```bash
npm run lint
```

```bash
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
