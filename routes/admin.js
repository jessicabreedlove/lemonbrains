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
router.get( '/', (req, res) => {
    console.log( "GET admin: Nom, nom, nom" ); 
    res.render( 'admin', { test: "TEST" }); // example of how you can pass values to the frontend
});

/*
    TODO: determine which routes are needed 
    TODO: protect routes with oauth
*/

// GET all locations
// router.get( '/locations', adminController.getLocations );

// POST create new location
// router.post( '/location/:location/css/:css', adminController.createLocation );

// TODO: create endpoint to modify user role
router.put( '/role/:id', adminController.updateRole );

// TODO: create endpoint to delete user (user, stand, statistics, )
router.delete( '/delete/:id', adminController.deleteUser );

module.exports = router; // make endpoints public