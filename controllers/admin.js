/***************************************
 * Admin controller
 * 
 * TODO: add description
 */

// includes ...
const mongodb = require( '../db/connect' );
// const Joi = require( 'joi' );
const ApiError = require( '../errors/ApiError' );


/***************************
// TODO: add description
****************************/
const getLocations = async ( req, res ) => {
    /*
        #swagger.description = 'Admin get locations';
    */
        console.log( "Debug: getLocations" );
        res.send( "getLocations() called" ); 
};

/***************************
// TODO: add description
****************************/
const createLocation = async ( req, res ) => {
    /*
        #swagger.description = 'Admin create location';
    */
    console.log( "Debug: createLocation" );
    res.send( "createLocation() called" ); 
};

/***************************
// PUT toggle admin role for user (this comes via a PUT request)
****************************/
const updateRole = async ( req, res, next ) => {
    /*
        #swagger.description = 'Toggle user admin role to be true or false'
        #swagger.responses[404] = { description: 'Unable to find user' }
    */
    const authid = req.params.id;

    await mongodb.getDb().db().collection( 'users' ).findOne( { authid: authid })
        .then( async result => {
            console.log( result );
            console.log( "Results from getUser()", result, result.admin );

            let admin = false;
            if ( !result.admin ) {
                // if user.admin == false, set true, otherwise, user.admin is true and should be set to false
                admin = true;
            }

            // save to database
            const update = { $set: {
                admin: admin
            }};

            console.log( "user admin update", update );
            mongodb.getDb().db().collection( 'users' ).updateOne( { authid: authid }, update, function( err, res ) {
                if (err) {
                    console.log( "0 document updated" );
                    throw err;
                }
                else{
                    console.log( "1 document updated" );
                }
            });

            res.render( 'admin', { role: true, result: result, admin: admin } );
        })
        .catch ( err => {
            console.log( "Fatal Error =", err);
            next( ApiError.notFound( "Unable to find user" ));
        });

    // TODO: function should identify user in 'users' and toggle admin field to be true or false
    console.log( "Debug: updateRole" );
    // res.send( "updateRole() called" ); 
};

/***************************
// DELETE user, stand, statistics 
****************************/
const deleteUser = async ( req, res ) => {
    /*
        #swagger.description = 'Delete user, stand, and related statistics '
        #swagger.responses[404] = { description: 'Unable to find user' }
    */

    try {
        const authid = req.params.id;

        // use then/catch for asynchronous code
        await mongodb.getDb().db().collection( 'users' ).deleteOne({ authid: authid })
            .then ( result => {
                deleteStand( authid );
                deleteStatistics( authid );

                res.render( 'admin', { delete: true, result: result } );
            })
            .catch ( err => {
                console.log( err );
                next( ApiError.internalServerError( 'An error occurred while deleting the user' ));
            });
    }
    catch ( err ) {
        next ( ApiError.notFound( "Error: invalid id" ));
    }

    // TODO: function should delete user, stand, statistics for the specified user
    console.log( "Debug: deleteUser" );
    //res.send( "deleteLocation() called" ); 
};

// delete stand
const deleteStand = async ( authid ) => {
    await mongodb.getDb().db().collection( 'stands' ).deleteOne({ authid: authid })
    .then ( result => {
        console.log( `Deleting Stand with authid: ${authid}`);
    })
    .catch ( err => {
        console.log( err );
        next( ApiError.internalServerError( 'An error occurred while deleting the stand' ));
    });
};

// delete add, sub, mul, div statistics
const deleteStatistics = async ( authid ) => {
    await mongodb.getDb().db().collection( 'statistics' ).deleteMany({ authid: authid })
    .then ( result => {
        console.log( `Deleting Statistics with authid: ${authid}`);
    })
    .catch ( err => {
        console.log( err );
        next( ApiError.internalServerError( 'An error occurred while deleting the statistics' ));
    });
};

const isAdmin = async ( req, res ) => {

    const authid = req.oidc.user.sub;

    await mongodb.getDb().db().collection( 'users' ).findOne( { authid: authid })
        .then( async result => {
            console.log( "Default admin page", result );

            // 1. get user, redirect if not admin
            if ( result.admin ) {
                res.render( 'admin', { test: "TEST" }); // example of how you can pass values to the frontend
            }
            else {
                res.redirect( "/stands" ); // user is not an admin
            }
        })
        .catch ( err => {
            console.log( "Fatal Error =", err );
        });

};

module.exports = { getLocations, createLocation, updateRole, deleteUser, isAdmin };