# FDJ test

This is an Angular project that uses the NX workspace. It includes various NX plugins for tasks such as testing with Jest, building with esbuild and webpack, linting with ESLint but also libs for business logic segregation. It also uses the Angular CLI, compiler, and language service. Backend app has its documentation, generated with Swagger.

## Installation

1. Clone the repository
2. Compose up from the docker-compose.yml

## Usage

The app should initialize by itself, including restoring the db.
After initialization, you should be able to see the result :
- on your [localhost:4200](http://localhost:4200) for the Angular app,
- on your [localhost:3333/api-docs](http://localhost:3333/api-docs) for the Express app documentation.

## About the app
Angular app :
- Angular (18)
- Reactive forms
- RxJS
- Bootstrap icons
- Tests

Express app :
- Clean Architecture
- Restful API
- Tests
- Swagger documentation


