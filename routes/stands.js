/***************************************
* Stand routes
* 
* all routes in this file begin with /stands 
*/

// includes ...
const router = require( 'express' ).Router();
const standsController = require( '../controllers/stands' );
// const { auth, requiresAuth } = require( 'express-openid-connect'); // dereference return

////////////////////////////////////////////////////////////////

// GET stand that matches authid else redirect to setup page
router.get( '/', standsController.getStand );

// GET a specific stand
router.get( '/:id', standsController.getStand );

// POST create a new stand (and user)
router.post( '/', standsController.createStand );

// PUT update stand (day and earnings)
router.put( '/', standsController.updateStand );
router.post( '/put', standsController.updateStand ); // used via a form POST
//router.post( '/put/:id', standsController.updateStand ); // used via a form POST

// DELETE user
router.delete( '/:id', standsController.deleteStand );

module.exports = router; // make endpoints public