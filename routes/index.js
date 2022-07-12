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

/* THE PROGRAM USES THE STATS AND LEADER CONTROLLER, BUT CURRENTLY NO REASON TO HAVE ENDPOINTS FOR EITHER */
// redirect any uri that begins with /statistics to controller
// router.use( '/statistics', require( './statistics' ));

// redirect any uri that begins with /leader-board to controller
// router.use( '/leaders', require( './leaders' ));

// route any uri that begins with /api-docs
router.use( '/api-docs', requiresAuth(), require( './swagger' ));

/***************************
// default (front page)
****************************/
router.get( '/', (req, res, next ) => {
    // res.send( 'Ahoy Matey' );
    console.log( "Nom, nom, nom" ); 
    /*
    COMMENT: here is the main page link, if a user is not logged in, show the leader board, otherwise, look for a matching stand    
    */
    // https://www.youtube.com/watch?v=w1zvS9-k7EU
    // https://auth0.com/docs/secure/tokens#id-tokens
    if ( req.oidc.isAuthenticated() ) {
        //console.log( "idToken=", req.oidc.idToken ); // what can I use to id the user ?
        //console.log("accessToken=", req.oidc.accessToken);
        //console.log("fetchUserInfo=", req.oidc.fetchUserInfo);
        //console.log("user=", req.oidc.user);
        //console.log("idTokenClaims=", req.oidc.idTokenClaims);
        console.log("userid=", req.oidc.user.sub);

        // eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9HcHFmMkdFR2hCWnRSNzFudnlOVCJ9.eyJuaWNrbmFtZSI6InNhdXRlcmVsbGUud2ViIiwibmFtZSI6InNhdXRlcmVsbGUud2ViQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8wYWY5N2NmMTFiNTJhNGY1MDQzZmFkZDJjN2RmMmQ2Mj9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnNhLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIyLTA2LTI5VDE5OjEyOjMyLjg2NFoiLCJlbWFpbCI6InNhdXRlcmVsbGUud2ViQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Rldi1wbnQ4MG1hNS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjJhMGQ2YTU3MjE3MjFkNjYxOTgyZDA3IiwiYXVkIjoibVk2SnRoY1VDcGpRVGdZOWJVMVNRVzN3dTBFRnVvVEoiLCJpYXQiOjE2NTY1MzAyODQsImV4cCI6MTY1NjU2NjI4NCwibm9uY2UiOiJrenM0RzNOa1E5MUxKdnRnbEY3UGVUZ28wQ0xDWlVuclYtX0JPRGItNTY4In0.r-lfk6SaYI-J-uyg9odK4FlIjNkOqHYLnzgz9IwAfNnQXF2ZIj00th0FmsJjdjv-VllRrcPK1cqyOw2fuFrsek33ntvrPTuqALVvdURin0oqDFNvdJ1KVB7Yxyn9ixGONeHziGpqYDXWzGGEyxbeAJJ45kVeefzd0mnzQntjqPCtbiM_1pqNdK1e7COuYLwzl6ER7YwXE-mTBGvIdc4WnY5HZLvtvO0mhb5K4lsykyqdYs2oirMPvleI45fAe1IDu6h7gZ4ckpaLPFA-Gpp8DJj7QjxnMGgNnRdvlQkwz2Fmq6ik75dI2YyZwdYB_LiJUn-uobK3dokNd8zZvOmySg

        standsController.getStand( req, res, next );
        // redirect to stand ?
    }
    else {
        // not authenticated, return index
        getLeaders(req, res);
        // LOGIN CURRENTLY SIMULATED IN THE HOME PAGE WITH GET LINK THAT GOES DIRECTLY TO THE CORRECT ENDPOINT
        // const standsController = require( '../controllers/stands' );
        // 
    }
});

module.exports = router; // make endpoints public