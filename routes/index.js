/***************************************
 * Main routes file
 * 
 * naming conventions https://blog.dreamfactory.com/best-practices-for-naming-rest-api-endpoints
 * use nouns to represent resources, use plural unless the resource is singular
 * 
 * TESTING: auth0|62a0d6a5721721d661982d07
 */

// includes ...
const router = require( 'express' ).Router();
const { getLeaders } = require('../controllers/leader');
const standsController = require( '../controllers/stands' );
const { auth, requiresAuth } = require('express-openid-connect'); // dereference return, store in variables


// redirect any uri that begins with /admin to controller
router.use( '/admin', requiresAuth(), require( './admin' ));

// redirect any uri that begins with /users to controller
router.use( '/users', requiresAuth(), require( './users' ));

// redirect any uri that begins with /stands to controller
router.use( '/stands', requiresAuth(), require( './stands' ));

// redirect any uri that begins with /leaders to controller
router.use( '/leaders', requiresAuth(), require( './leaders' ));

// redirect any uri that begins with /statistics to controller
router.use( '/statistics', requiresAuth(), require( './statistics' ));

// route any uri that begins with /api-docs
router.use( '/api-docs', require( './swagger' ));

/***************************
// default (front page)
****************************/
router.get( '/', (req, res, next ) => {
    /*
    #swagger.description = 'Home page, (default) no authentication required'
    #swagger.responses[200] = { description: 'Show leader board' }
    */    
    console.log( "Nom, nom, nom" ); 
    /*
    COMMENT: here is the main page link, if a user is not logged in, show the leader board, otherwise, look for a matching stand    
    */
    // https://www.youtube.com/watch?v=w1zvS9-k7EU
    // https://auth0.com/docs/secure/tokens#id-tokens
    if ( req.oidc.isAuthenticated() ) {
        //console.log("idToken=", req.oidc.idToken ); // what can I use to id the user ?
        //console.log("accessToken=", req.oidc.accessToken);
        //console.log("fetchUserInfo=", req.oidc.fetchUserInfo);
        //console.log("user=", req.oidc.user);
        //console.log("idTokenClaims=", req.oidc.idTokenClaims);
        console.log( "Authenticated userid in main routes file (index.js)=", req.oidc.user.sub );

        // redirect to stand
        standsController.getStand( req, res, next );
    }
    else {
        // not authenticated, return index
        getLeaders( req, res );
    }
});

module.exports = router; // make endpoints public