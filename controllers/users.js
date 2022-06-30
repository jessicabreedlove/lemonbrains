/***************************************
 * Users controller
 * 
 * Manage user role information
 */


// includes ...
const mongodb = require( '../db/connect' );
// const Joi = require( 'joi' );
const ApiError = require( '../errors/ApiError' );

/***************************
// Get user
****************************/
const getUser = async ( req, res ) => {
    /*
        #swagger.description = 'Show user settings';
    */
    console.log( "Debug: getUser() in users controller" );

    // const authid = req.params.id; // TODO: get this in a post request from body ...
    const authid = req.oidc.user.sub;

    await mongodb.getDb().db().collection( 'users' ).findOne( { authid: authid })
        .then( async result => {
            console.log( "Results from getUser()", result, result.admin, result.add );
            res.render( 'settings', { stand: "taco", result: result } );
        })
        .catch ( err => {
            console.log( "Fatal Error =", err );
        });
};

/***************************
// Create user
****************************/
const createUser = async ( req ) => {
    /*
        #swagger.description = 'Create user with default settings';
        #swagger.parameters['dayLength'] = { description: 'Length of game play in minutes 1-10, 0=infinite' };
        #swagger.parameters['add'] = { description: 'Generate questions with addition' };
        #swagger.parameters['sub'] = { description: 'Generate questions with subtraction' };
        #swagger.parameters['mul'] = { description: 'Generate questions with multiplication' };
        #swagger.parameters['div'] = { description: 'Generate questions with division' };
    */
    console.log( "Debug: createUser() in users controller" );

    const authid = req.oidc.user.sub;
    const { dayLength, add, sub, mul, div } = req.body;

    const user = {
        authid: authid,
        dayLength: dayLength,
        add: add,
        sub: sub,
        mul: mul,
        div: div,
        admin: false
    };

    // add user to collection
    mongodb.getDb().db().collection( 'users' ).insertOne( user );
};

/***************************
// Update user
****************************/
const updateUser = async ( req, res, next ) => {
    /*
        #swagger.description = 'Update user settings';
        #swagger.parameters['dayLength'] = { description: 'Length of game play in minutes 1-10, 0=infinite' };
        #swagger.parameters['add'] = { description: 'Generate questions with addition' };
        #swagger.parameters['sub'] = { description: 'Generate questions with subtraction' };
        #swagger.parameters['mul'] = { description: 'Generate questions with multiplication' };
        #swagger.parameters['div'] = { description: 'Generate questions with division' };
    */
    console.log( "Debug: updateUser() in users controller", req );

    const authid = req.oidc.user.sub;
    const { dayLength, add, sub, mul, div } = req.body;

    const update = { $set: {
        dayLength: dayLength,
        add: add,
        sub: sub,
        mul: mul,
        div: div
    }};

    await mongodb.getDb().db().collection( 'users' ).updateOne( { authid: authid }, update, { upsert: true })
        .then( async result => {
            console.log( "update user settings: ", result );

            // all good redirect to user page
            res.redirect( "/stands/" ); // using OK causes intermediate page to show and requires an additional click
        })
        .catch ( err => {
            console.log( "Fatal Error =", err );
        });
};

module.exports = { getUser, createUser, updateUser };