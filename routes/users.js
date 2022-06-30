/***************************************
* User routes
* 
* all routes in this file begin with /admin
* 
*/

// includes ...
const router = require( 'express' ).Router();
const userController = require( '../controllers/users' );
// const { auth, requiresAuth } = require( 'express-openid-connect'); // dereference return

////////////////////////////////////////////////////////////////

// TODO: protect routes with oauth
// GET user
router.get( '/', userController.getUser );

// POST user
router.post( '/put', userController.updateUser );

module.exports = router; // make endpoints public