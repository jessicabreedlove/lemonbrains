/***************************************
* Statistics routes
* 
* all routes in this file begin with /statistics
* 
* while it is possible to get and update a user stat, empty documents
* are created (POST) and deleted (DELETE) by the user controller
*/

// includes ...
const router = require( 'express' ).Router();
const statisticsController = require( '../controllers/statistics' );
// const { auth, requiresAuth } = require( 'express-openid-connect'); // dereference return
 
////////////////////////////////////////////////////////////////

// endpoint to meet rubric
router.post( '/', statisticsController.createStat );
router.delete( '/', statisticsController.deleteStat );

module.exports = router; // make endpoints public