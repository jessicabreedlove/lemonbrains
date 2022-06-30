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
router.get( '/', ( req, res ) => {
    console.log( "GET admin: Nom, nom, nom" ); 

    adminController.isAdmin( req, res );
});

/*
    TODO: determine which routes are needed 
    TODO: protect routes with oauth
*/

// GET all locations
// router.get( '/locations', adminController.getLocations );

// POST create new location
// router.post( '/location/:location/css/:css', adminController.createLocation );

// endpoint to toggle admin role
router.put( '/role/:id', adminController.updateRole );
router.get( '/role/:id', adminController.updateRole );

// endpoint to delete user (user, stand, statistics, )
router.delete( '/delete/:id', adminController.deleteUser );
router.get( '/delete/:id', adminController.deleteUser );

module.exports = router; // make endpoints public