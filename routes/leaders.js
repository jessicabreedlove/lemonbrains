/***************************************
* Leader-board routes
* 
* all routes in this file begin with /leaders
* 
*/

/******************************************************
// NOTE: THIS PAGE MAY NOT BE NEEDED
******************************************************/

// includes ...
const router = require( 'express' ).Router();
const leaderController = require( '../controllers/leader' );
// const { auth, requiresAuth } = require( 'express-openid-connect'); // dereference return

////////////////////////////////////////////////////////////////

// GET all leader
// router.get( '/', leaderController.getLeaders );

// POST create new leader
router.post( '/', leaderController.createBoard );

// PUT update existing leader
// router.post( '/:id/leader/:leader', leaderController.updateLeader );

// DELETE remove leader
router.delete( '/', leaderController.deleteBoard );

module.exports = router; // make endpoints public