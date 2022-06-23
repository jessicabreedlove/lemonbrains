/***************************************
 * Main routes file
 * 
 * naming conventions https://blog.dreamfactory.com/best-practices-for-naming-rest-api-endpoints
 * use nouns to represent resources, use plural unless the resource is singular
 */

// includes ...
const router = require( 'express' ).Router();
const { getLeaders } = require('../controllers/leader');


// redirect any uri that begins with /admin to controller
router.use( '/admin', require( './admin' ));

// redirect any uri that begins with /users to controller
router.use( '/users', require( './users' ));

// redirect any uri that begins with /stands to controller
router.use( '/stands', require( './stands' ));

/* THE PROGRAM USES THE STATS AND LEADER CONTROLLER, BUT CURRENTLY NO REASON TO HAVE ENDPOINTS FOR EITHER */
// redirect any uri that begins with /statistics to controller
// router.use( '/statistics', require( './statistics' ));

// redirect any uri that begins with /leader-board to controller
// router.use( '/leaders', require( './leaders' ));

// route any uri that begins with /api-docs
router.use( '/api-docs', require( './swagger' ));

/***************************
// default (front page)
****************************/
router.get( '/', (req, res) => {
    // res.send( 'Ahoy Matey' );
    console.log( "Nom, nom, nom" ); 
    /*
    COMMENT: here is the main page link, if a user is not logged in, show the leader board, otherwise, look for a matching stand    
    */
    // if not authenticated, return index {
          getLeaders(req, res);
    // }
    // else return stand page {
        // LOGIN CURRENTLY SIMULATED IN THE HOME PAGE WITH GET LINK THAT GOES DIRECTLY TO THE CORRECT ENDPOINT
        // const standsController = require( '../controllers/stands' );
        // standController.getStand();
    // }
});

module.exports = router; // make endpoints public