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

// GET a single stand
router.get( '/', (req, res ) => {

    // TODO: update code once authentication is in place, basic structure is in place
    // if logged in, get information to build the stand
    // if ( req.oidc.isAuthenticated() ) {
        standsController.getStand( req, res );
    // }
    // else {
        // res.send( 'TODO: login and redirect back here with some way to identify stand' );
        /*
        res.render( 'index', { message: 'Welcome ...' });
        */
    // }
});


// GET a single stand ... IS THIS NEEDED OR EVEN POSSIBLE ??? USED TO TEST ACCOUNT WHEN LOGGED IN
router.get( '/:id', standsController.getStand );

// POST create a new stand (and user)
//router.post( '/name/:name', standsController.createStand );
router.post( '/', standsController.createStand );
// router.post( '/name/:name', requireAuth(), standsController.createStand );

// TODO: PUT update day and earnings
router.post( '/put', standsController.updateStand );
//router.post( '/op/:op/brains/:brains', standsController.updateStand );

////////////////////////////////////////////////////////////////

// TODO DELETE
// router.post( '/del', standsController.deleteStand );

// DELETE remove a stand
// router.delete( '/:id', standsController.deleteStand );
// router.delete( '/:id',requiresAuth(), standsController.deleteStand );

module.exports = router; // make endpoints public