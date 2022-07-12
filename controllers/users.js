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
// Get all users
****************************/
const getUsers = async ( req, res ) => {
    /*
        #swagger.description = 'Get all users';
    */
    console.log( "Debug: getUser() in users controller" );

    const result = mongodb.getDb().db().collection( 'users' ).find();
    try {
        if ( result._eventsCount != 0 ) {
                // TODO: create a page to view users
                console.log( "Results from getUser()", result );
                res.send(result);
        }
        else {
            res.send( "The database contains 0 users" );
            //next( ApiError.notFound( "Error: user not found" ) );
        }
    }
    catch ( err ) {
        console.log( "Fatal Error =", err );
    }
};


/***************************
// Get user
****************************/
const getUser = async ( req, res, next ) => {
    /*
        #swagger.description = 'Get user';
        #swagger.parameters['authid'] = { description: 'User authentication id' };
    */
    console.log( "Debug: getUser() in users controller" );

    // const authid = req.params.id; // TODO: get this in a post request from body ...
    const authid = req.oidc.user.sub;

    await mongodb.getDb().db().collection( 'users' ).findOne( { authid: authid })
        .then( async result => {
            console.log( "Results from getUser()", result );
            if ( result == null ) {
                next( ApiError.notFound( "The user you requested was not found" ));
            }
            else {
                res.render( 'settings', { stand: "taco", result: result } );                
            }
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

    let { dayLength, add, sub, mul, div } = req.body;

    // use defaults if not assigned
    if (req.body.dayLength == null) {
        dayLength = 60;
        add = "on";
        sub = "on";
        mul = "";
        div = "";
    }

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

module.exports = { getUsers, getUser, createUser, updateUser };