/***************************************
* Admin routes
* 
* all routes in this file begin with /admin
* 
*/

// includes ...
const router = require( 'express' ).Router();
const adminController = require( '../controllers/admin' );
// const { auth, requiresAuth } = require( 'express-openid-connect'); // dereference return

////////////////////////////////////////////////////////////////

/***************************
// default (admin page)
****************************/
// endpoint to toggle admin role
router.put( '/role/:id', adminController.updateRole );
//router.get( '/role/:id', adminController.updateRole );

// endpoint to delete user (user, stand, statistics, )
router.delete( '/delete/:id', adminController.deleteUser );
//router.get( '/delete/:id', adminController.deleteUser );

module.exports = router; // make endpoints public