/***************************************
* Statistics routes
* 
* all routes in this file begin with /statistics
* 
* while it is possible to get and update a user stat, empty documents
* are created (POST) and deleted (DELETE) by the user controller
*/

/******************************************************
// NOTE: THIS PAGE MAY NOT BE NEEDED
******************************************************/

// includes ...
const router = require( 'express' ).Router();
const statisticsController = require( '../controllers/statistics' );
// const { auth, requiresAuth } = require( 'express-openid-connect'); // dereference return
 
////////////////////////////////////////////////////////////////

// GET a single stat
// router.get( '/:id/op/:operation', statisticsController.getStat );
 
// PUT update a stat
// requires a user id, type of operation (add, sub, mul, div), number attempted and number correct
// router.put( '/:id/op/:operation/count/:count/correct/:correct', statisticsController.updateStat );
// router.put( '/:id/op/:operation/count/:count/correct/:correct', requireAuth(), standsController.updateStand );

module.exports = router; // make endpoints public