/***************************************
* Swagger documentation
* 
* https://www.npmjs.com/package/swagger-ui-express
* 
*/

// imports ...
const router = require( 'express' ).Router();
const swaggerUi = require( 'swagger-ui-express' ); // https://www.npmjs.com/package/swagger-ui-express
const swaggerDocument = require( '../swagger.json' );
//const { auth, requiresAuth } = require('express-openid-connect'); // dereference return, store in variables
//require('dotenv').config();

// load whatever swaggerUi.serve is
router.use( '/', swaggerUi.serve );

// write endpoint information to swaggerDocument
// router.get( '/', requiresAuth(), swaggerUi.setup( swaggerDocument )); TODO: set up authentication
router.get( '/', swaggerUi.setup( swaggerDocument ));

module.exports = router; // make endpoints public