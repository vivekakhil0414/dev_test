
#### Installing dependencies
`npm install`

#### Requirement for database

This project needs requirement of mongodb. run mongodb or check status by running `systemctl status mongodb or mongod` (depending upon the installation steps in linux) if active then good to go and if not use `systemctl start mongod` and in windows run mongod in cli and mongo in other cli.


#### Running the project
`npm run dev` this will use concurrently ( npm package ) to run both server and react project concurrently. Read more about [concurrently](https://www.npmjs.com/package/concurrently)

### `npm run test`
in another terminal for testing










