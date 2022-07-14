/***************************************
 * Admin controller
 * 
 * A place for all things administrative
 */

// includes ...
const mongodb = require( '../db/connect' );
const Joi = require( 'joi' );
const ApiError = require( '../errors/ApiError' );


/***************************
// PUT toggle admin role for user
****************************/
const updateRole = async ( req, res, next ) => {
    /*
    #swagger.description = 'Toggle user admin role to be true or false'
    #swagger.responses[201] = { description: 'User admin status successfully updated' }
    #swagger.responses[401] = { description: 'Unauthorized access' }
    #swagger.responses[404] = { description: 'Unable to find user' }
    #swagger.responses[500] = { description: 'Undocumented error, are you certain you\'re logged in?' }
    #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            description: 'Toggle the user admin flag',
            schema: {
                $userid: '...',
            }
        };           
    */
    console.log( "Debug: updateUser() in admin controller" );

    const authid = req.oidc.user.sub; // authenticated id

    if ( authid ) {
        
        // VALIDATION
        const { error } = validateUpdate( req.body );

        if ( error ) {
            next( ApiError.badRequest( 'Invalid role data: ' + error.details[0].message ));
            return;
        }

        const userid = req.body.userid; // instead, pull this from the body

        console.log( "Toggle role of authid: ", userid );

        await mongodb.getDb().db().collection( 'users' ).findOne( { authid: userid })
        .then( async result => {

            if ( result == null ) {
                res.sendStatus( 404 );
            }
            else {
                console.log( "Results from updateRole()", result, result.admin );

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
                await mongodb.getDb().db().collection( 'users' ).updateOne( { authid: authid }, update )
                .then ( result => {
                    if ( result.acknowledged ) {
                        console.log( "1 document updated" );
                        res.setHeader( 'Content-Type', 'application/json' );
                        res.status( 201 ).json( result );
                        // res.render( 'admin', { toggle: true } ); // 200 TODO: build this admin page
                        next();
                    }
                    else {
                        next( ApiError.internalServerError( 'An error occurred after updating the user' )); // 500
                    }
                })
                .catch ( err => {
                    next( ApiError.internalServerError( 'An error occurred while updating the user' )); // 500
                });
            }
        })
        .catch ( err => {
            console.log( err );
            next( ApiError.notFound( "Unable to find user" )); // 404
        });
    }
    else {
        console.log( err );
        next ( ApiError.unauthorized( "Error: missing authid" )); // 401
    }      
};

/***************************
// DELETE user, stand, statistics 
****************************/
const deleteUser = async ( req, res ) => {
    /*
    #swagger.description = 'Delete user, stand, and related statistics'
    #swagger.responses[200] = { description: 'The user, stand and related statistics were deleted' }
    #swagger.responses[401] = { description: 'Unauthorized access' }
    #swagger.responses[404] = { description: 'Unable to find user' }
    #swagger.responses[500] = { description: 'Undocumented error, are you certain you\'re logged in?' }
    */
    console.log( "Debug: deleteUser() in admin controller" );

    const authid = req.oidc.user.sub; // authenticated id

    if ( authid ) {
        const userid = req.params.id; // id of the user to delete

        // use then/catch for asynchronous code
        await mongodb.getDb().db().collection( 'users' ).deleteOne({ authid: userid })
        .then ( result => {
            console.log( "Deleted user = ", result );

            if ( result.deletedCount == 0 ) {
                res.sendStatus( 404 );
            }
            else {
                deleteStand( authid );
                deleteStatistics( authid );
                res.setHeader( 'Content-Type', 'application/json' );
                res.status( 201 ).json( result );
                // res.render( 'admin', { delete: true } ); // 200 TODO: build this admin page
            }
        })
        .catch ( err => {
            next( ApiError.internalServerError( 'An error occurred while deleting the user' )); // 500
        });
    }
    else {
        console.log( err );
        next ( ApiError.unauthorized( "Error: missing authid" )); // 401
    }  
};

// delete stand
const deleteStand = async ( authid ) => {
    await mongodb.getDb().db().collection( 'stands' ).deleteOne({ authid: authid })
    .then ( result => {
        console.log( `Deleting Stand with authid: ${authid}` );
    })
    .catch ( err => {
        console.log( err );
        next( ApiError.internalServerError( 'An error occurred while deleting the stand' ));
    });
};

// delete statistics: add, sub, mul, div
const deleteStatistics = async ( authid ) => {
    await mongodb.getDb().db().collection( 'statistics' ).deleteMany({ authid: authid })
    .then ( result => {
        console.log( `Deleting Statistics with authid: ${authid}` );
    })
    .catch ( err => {
        console.log( err );
        next( ApiError.internalServerError( 'An error occurred while deleting the statistics' ));
    });
};

/*******************************
* VALIDATION
* https://joi.dev/api/?v=17.6.0
*******************************/
function validateUpdate( role ) {
    const schema = Joi.object({
        userid: Joi.string().required()
    });

    return schema.validate( role );
}

/*
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
};*/

module.exports = { updateRole, deleteUser };