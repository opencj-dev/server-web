## Development
Install [node.js](https://nodejs.org/en/download)

Run `npm i` to install node modules

Create a `.env` file and add a enviroment variable called `COD4_DATABASE_URL` with your database connection string e.g.:
`COD4_DATABASE_URL="mysql://{username}:{password}@{url}:{port}/openCJ_cod4`

(Only do this step if database schema has changed)
Run `npm run cod4dbschema` to generate typescript types from database schema.

Run `npm start` to start the web server. Then go to `http://localhost:3000/api-docs/` to view swagger docs. When you make changes the project will hot reload with new changes.

## Production run
Run `npm run build` to compile typescript project
Run `npm run prod` to run js project
