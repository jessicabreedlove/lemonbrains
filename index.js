/***************************************
 * Main
 *
 * This file is run when server starts up
 *
 */

// imports ...
const express = require('express'); // web application framework https://www.npmjs.com/package/express
const bodyParser = require('body-parser'); // parse req object https://www.npmjs.com/package/body-parser
const apiErrorHandler = require('./errors/handler'); // error handling

// TODO: implement both of these ...
const Joi = require('joi'); // data validation https://www.npmjs.com/package/joi
const { auth } = require('express-openid-connect'); // OAuth 2.0 https://www.npmjs.com/package/express-openid-connect

// enable use of environment variables
require('dotenv').config();

// create port and application
const port = process.env.PORT || 3000;
const app = express();
app.set('view engine', 'ejs'); // set template engine https://www.npmjs.com/package/ejs

// set up app ...
app
  // oauth
  // https://www.jamesqquick.com/blog/the-easiest-way-to-add-node-js-user-authentication
  // https://www.youtube.com/watch?v=w1zvS9-k7EU
  // the library needs issuerBaseURL, baseURL, clientID and secret to request and accept authentication
  .use(
    auth({
      issuerBaseURL: process.env.ISSUER_BASE_URL,
      baseURL: process.env.BASE_URL,
      clientID: process.env.CLIENT_ID,
      secret: process.env.SECRET,
      authRequired: false,
      auth0Logout: true,
      //idpLogout: true,
    })
  )
  // https://expressjs.com/en/resources/middleware/body-parser.html
  // parse application/x-www-form-urlencoded
  .use(bodyParser.urlencoded({ extended: false })) // needed to get data from req.body
  // parse application/json
  //.use( bodyParser.json()) // not sure if this needed
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // specifiy (domain, scheme, or port) from which a browser should permit loading resources https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    next();
  })
  .use(express.static(__dirname + '/views')) // without this, files can't include css and js
  .use('/', require('./routes')) // load routes
  .use(apiErrorHandler);

// load db
const mongodb = require('./db/connect');

// listen if connection is made
mongodb.initDb((err, mongodb) => {
  // start server if db is connected
  if (err) {
    console.log(err);
  } else {
    // listen for client requests ... ctrl C to stop server when running
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port: ${port}`);
    });
  }
});
