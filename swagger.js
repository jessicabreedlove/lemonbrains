/***************************************
* Swagger
* 
* this files gets called by running: <npm run swagger> (see scripts in package.json)
* https://www.npmjs.com/package/swagger-autogen
* https://medium.com/swlh/automatic-api-documentation-in-node-js-using-swagger-dd1ab3c78284
* 
*/

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    "swagger": "2.0",
    info: {
        title: 'Lemonbrains API',
        description: 'Amazing fusion of a lemonade stand and a zombie apocalypse',
    },
    version: '1.0.0',
    /*
    securityDefinitions: {
        TODO: adding content here is needed to get the Swagger padlock to work, waiting for feedback from Brother Lyon
        https://auth0.com/docs/get-started/authentication-and-authorization-flow/add-login-auth-code-flow
        https://manage.auth0.com/dashboard/us/dev-pnt80ma5/applications/5CWBdX2PemFCbEYEIeTKPv39W51kK1bq/settings
        https://sookocheff.com/post/api/securing-a-swagger-api-with-oauth2/
        https://swagger.io/docs/specification/authentication/
    },
    */
    host: 'localhost:3000',
    schemes: ['http'],
    //host: 'lemonbrains.herokuapp.com',
    //schemes: ['https'],
};
 
const outputFile = './swagger.json'; // file to create
const endpointsFiles = ['./routes/index.js']; // file(s) to scan for endpoints
 
/* NOTE: if you use the express Router, you must pass in the 
    'endpointsFiles' only the root file where the route starts,
    such as index.js, app.js, routes.js, ... */
 
swaggerAutogen(outputFile, endpointsFiles, doc);