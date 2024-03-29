# GraphiQL

> **GraphiQL is a playground/IDE for graphQL requests.**

> This project is developed by the team **_Up&Go_**

## Team mentor

[**Aleksandr Serdiuk**](https://github.com/alexserdyuk83 'Aleksandr`s GitHub')

## Team members

- [**Makaeva Elena** ](https://github.com/MakaevaElena 'Elena`s GitHub')
- [**Siarhei Muliarenka**](https://github.com/surface74 'Siarhei`s GitHub')
- [**Valeriia Melnikova**](https://github.com/MaleryValery 'Valeriia`s GitHub')

# Technology Overview

## Stack

- **Framework :** [React](https://react.dev/)
- **Language:** [Typescript](https://www.typescriptlang.org/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Authentication:** [Firebase](https://firebase.google.com/)
- **UI Component library:** [Material UI](https://mui.com/material-ui/)
- **Format code:** [Prettier](https://prettier.io/docs/en/index.html)
- **Improving code quality:** [ESLint](https://eslint.org/docs/latest/use/getting-started)
- **Git hook managment:** [Husky](https://github.com/typicode/husky#readme)
- **Testing framework:** [Vitest](https://vitest.dev/)

## Local Installation

- Clone repository to your local machine [repository](https://github.com/MakaevaElena/graphiql-app)

- Run `npm install`

## Available Scripts

In the project directory, you can run:

- Run `npm run dev` runs the app in the development mode
  Open http://localhost:5173/ to view it in the browser.

- Run `npm run prepare` starts huski
- Run `npm run tests` runs tests
- Run `npm run coverage` runs tests with coverage
- Run `npm run lint` launches Eslint for [ts,tsx] files
- Run `npm run fix` runs prettier and shows warning in CLI.
- Run `npm run build` for building project

## Start proxy-server
- Open another window Visual Studio Code
- Set folder `/proxy` as current
- Run `npm i`
- Run `npm run build`
- Run `npm start`
- You'll see the message 'CORS proxy-server is listening on port 8080' in terminal
- Don't close this window while testing

To use proxy-server, set checkbox 'proxy' into page 'Main'

