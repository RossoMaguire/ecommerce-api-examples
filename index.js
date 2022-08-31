const BigCommerce = require('node-bigcommerce');
const swell = require('swell-node');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// load in env vars
require('dotenv').config();
const port = process.env.PORT;

// Swell
swell.init(process.env.SWELL_STORE, process.env.SWELL_SECRET_KEY);

// We are using our packages here
app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(cors());

// Serve the frontend when deployed
// Have Node serve the files for our built client app
app.use(express.static(path.resolve(__dirname, 'client/dist')));

app.get('/api', (req, res) => {
  res.send('Welcome to your API server');
});

// Route that handles the big commerce api
app.get('/api/bigcommerce', (req, res) => {
  const bigCommerce = new BigCommerce({
    clientId: process.env.BIGCOMMERCE_CLIENT_ID,
    accessToken: process.env.BIGCOMMERCE_ACCESS_TOKEN,
    storeHash: process.env.BIGCOMMERCE_STORE_HASH,
    responseType: 'json',
  });
  bigCommerce
    .get('/products')
    .then((data) => {
      // Catch any errors, or handle the data returned
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// Route that handles the swell api
app.get('/api/swell', (req, res) => {
  swell
    .get('/products', {
      active: true,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      const message = { message: 'Trial Expired' };
      res.send(message);
    });
});

// Base path will return our client app
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/dist', 'index.html'));
});

// All other not handled routes return 4040
app.get('*', (req, res) => {
  res.status(404).send('Woops that page cannot be found');
});

// Start your server on a specified port
app.listen(port, () => {
  console.log(`Node Server is runing on port ${port}`);
});
