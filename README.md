# ecommerce-api-examples

Render product cards with data coming from WordPress and various eCommerce vendors

## Development - frontend

To Develop the frontend `cd` into `client` and run:

`npm install`

Run the root `index.html` in the browser, I use [Live Server for VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to serve it in one click.

The webpack dev server builds the `./dist/ecommerce.min.js` with changes while it is running, so to get changes instantly make sure to comment in this script on [line 106 of index.html](https://github.com/RossoMaguire/ecommerce-api-examples/blob/42aedbe809ee5dcee512966224c05cd2989e2190/index.html#L106) during development.

## Development - server

To Develop the server run:

`npm install`

`npx nodemon index.js`

## Build

`npm run build` from within `client` will output html, css and js files to the `./dist` directory. Make sure to comment out [line 106 of index.html](https://github.com/RossoMaguire/ecommerce-api-examples/blob/42aedbe809ee5dcee512966224c05cd2989e2190/index.html#L106)

When working in Node, to build the latest frontend that will be served by the express server run from root:

`npm run build`

To run the server

`npx nodemon index.js`
