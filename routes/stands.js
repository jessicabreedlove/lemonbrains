/***************************************
 * Stand routes
 *
 * all routes in this file begin with /stands
 */

// includes ...
const router = require('express').Router();
const standsController = require('../controllers/stands');
// const { auth, requiresAuth } = require( 'express-openid-connect'); // dereference return

////////////////////////////////////////////////////////////////

// GET stand that matches authid else redirect to setup page
router.get('/', standsController.getStand);

// GET a specific stand
router.get('/:id', standsController.getStand);

// POST create a new stand (and user)
//router.post( '/name/:name', standsController.createStand );
router.post('/', standsController.createStand);
// router.post( '/name/:name', requireAuth(), standsController.createStand );

// TODO: PUT update stand (day and earnings)
router.post('/put/:id', standsController.updateStand);
//router.post( '/op/:op/brains/:brains', standsController.updateStand );

////////////////////////////////////////////////////////////////

// TODO DELETE
// router.post( '/del', standsController.deleteStand );

// DELETE remove a stand
// router.delete( '/:id', standsController.deleteStand );
// router.delete( '/:id',requiresAuth(), standsController.deleteStand );

module.exports = router; // make endpoints public
