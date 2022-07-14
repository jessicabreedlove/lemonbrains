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
router.get( '/', userController.getUsers );

// GET user
router.get( '/:id', userController.getUser );

// POST update user
router.put( '/:id', userController.updateUser );
router.post( '/put', userController.updateUser ); // update via POST form

// DELETE user
router.delete( '/:id', userController.deleteUser );

module.exports = router; // make endpoints public