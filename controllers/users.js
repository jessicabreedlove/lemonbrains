/***************************************
 * Users controller
 * 
 * Manage users
 */

// includes ...
const mongodb = require( '../db/connect' );
const Joi = require( 'joi' );
const ApiError = require( '../errors/ApiError' );

/***************************
// Get all users
****************************/
const getUsers = async ( req, res, next ) => {
    /*
    #swagger.description = 'Get all users';
    #swagger.responses[200] = { description: 'Return database users' }
    #swagger.responses[401] = { description: 'Unauthorized access' }        
    #swagger.responses[500] = { description: 'Undocumented error, are you certain you\'re logged in?' }
    */
    console.log( "Debug: getUser() in users controller" );


    await mongodb.getDb().db().collection( 'users' ).find().toArray()
    .then ( result => {
        // throw new Error("Intentional error");
        console.log( result );
        res.setHeader( 'Content-Type', 'application/json' );
        res.status( 200 ).json( result) ;
        next();
    })
    .catch (err => {
        // handle db related errors
        console.log( err );
        // res.status( 500 ).json( err || 'An error occurred while getting users.' );
        next( ApiError.internalServerError( err )); // 500
    });
};


/***************************
// Get user with id
****************************/
const getUser = async ( req, res, next ) => {
    /*
    #swagger.description = 'Get user';
    #swagger.parameters['authid'] = { description: 'User authentication id' };
    #swagger.responses[200] = { description: 'Return database user' }
    #swagger.responses[401] = { description: 'Unauthorized access' }        
    #swagger.responses[500] = { description: 'Undocumented error, are you certain you\'re logged in?' }        
    */
    console.log( "Debug: getUser() in users controller" );

    const authid = req.oidc.user.sub; // authenticated id

    if ( authid ) {
        await mongodb.getDb().db().collection( 'users' ).findOne( { authid: authid })
        .then( async result => {
            console.log( "Results from getUser()", result );
            if ( result == null ) {
                next( ApiError.notFound( 'The user you requested was not found' ));
            }
            else {
                res.render( 'settings', { stand: "taco", result: result } );
            }
        })
        .catch ( err => {
            console.log( "Fatal Error =", err );
            next( ApiError.internalServerError( err )); // 500
        });        
    }
    else {
        console.log( err );
        next ( ApiError.unauthorized( 'Error: missing authid' )); // 401
    }      
};

/***************************
// Create user
****************************/
const createUser = async ( req, res, next ) => {
    /*
    #swagger.description = 'Create user with default settings';
    #swagger.responses[201] = { description: 'User created' }
    #swagger.responses[400] = { description: 'Bad request, make sure inputs are strings' }
    #swagger.responses[401] = { description: 'Unauthorized access' }        
    #swagger.responses[500] = { description: 'Undocumented error, are you certain you\'re logged in?' }
    #swagger.parameters['body'] = {
            in: 'body',
            description: 'Set length of day in seconds and what questions should be asked (addition, subtraction, multiplication, division)',
            schema: {
                $dayLength: '60',
                $add: 'on',
                $sub: 'on',
                $mul: 'on',
                $div: 'on'
            }
        };
    */
    console.log( "Debug: createUser() in users controller" );

    const authid = req.oidc.user.sub; // authenticated id

    if ( authid ) {
        
        // VALIDATION
        const { error } = validateUser( req.body );

        if( error ) {
            next( ApiError.badRequest( 'Invalid user data: ' + error.details[0].message ));
            return;
        }

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
        await mongodb.getDb().db().collection( 'users' ).insertOne( user )
        .then( result => {
            if( result.acknowledged ) {
                console.log( result ); // 
            }
            else {
                next( ApiError.internalServerError( 'An error occured after creating the user, it must be the zombie apocalypse' )); // 500
            }
        })
        .catch( err => {
            console.log( err );
            next( ApiError.internalServerError( 'An error occured while creating the user, it must be the zombie apocalypse' )); // 500
        });
    }
    else {
        console.log( err );
        next( ApiError.unauthorized( "Error: missing authid" )); // 401
    }
};

/***************************
// Update user
****************************/
const updateUser = async ( req, res, next ) => {
    /*
    #swagger.description = 'Update user settings';
    #swagger.responses[201] = { description: 'User updated' };
    #swagger.responses[400] = { description: 'Bad request, make sure inputs are strings' }
    #swagger.responses[401] = { description: 'Unauthorized access' }        
    #swagger.responses[500] = { description: 'Undocumented error, are you certain you\'re logged in?' };
    #swagger.parameters['body'] = {
            in: 'body',
            description: 'Set length of day in seconds and what questions should be asked (addition, subtraction, multiplication, division)',
            schema: {
                $dayLength: '60',
                $add: 'on',
                $sub: 'on',
                $mul: 'on',
                $div: 'on'
            }
        };
    */
    console.log( "Debug: updateUser() in users controller" );
    
    const authid = req.oidc.user.sub; // authenticated id

    if ( authid ) {

        // VALIDATION
        const { error } = validateUser( req.body );

        if ( error ) {
            next( ApiError.badRequest( 'Invalid user data: ' + error.details[0].message ));
            return;
        }

        const { dayLength, add, sub, mul, div } = req.body;

        const update = { $set: {
            dayLength: dayLength,
            add: add,
            sub: sub,
            mul: mul,
            div: div
        }};
    
        console.log( "Update user with authid : ", authid );
        await mongodb.getDb().db().collection( 'users' ).updateOne( { authid: authid }, update, { upsert: true })
        .then( async result => {
            console.log( 'update user settings: ', result );
    
            // all good redirect to user page
            res.redirect( "/stands/" ); // using OK causes intermediate page to show and requires an additional click
        })
        .catch ( err => {
            console.log( "Fatal Error =", err );
            next( ApiError.internalServerError( err )); // 500
        });
    }
    else {
        console.log( err );
        next ( ApiError.unauthorized( 'Error: missing authid' )); // 401
    }
};

/***************************
// DELETE user (added for rubric)
****************************/
const deleteUser = async ( req, res ) => {
    /*
    #swagger.description = 'Delete user
    #swagger.responses[201] = { description: 'The user was deleted' }
    #swagger.responses[401] = { description: 'Unauthorized access' }        
    #swagger.responses[404] = { description: 'Unable to find user' }
    #swagger.responses[500] = { description: 'Undocumented error, are you certain you\'re logged in?' }
    */

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
                res.setHeader( 'Content-Type', 'application/json' );
                res.status( 201 ).json( result );
            }
        })
        .catch ( err => {
            console.log( err );
            next( ApiError.internalServerError( 'An error occurred while deleting the user, it must be the zombie apocalypse' )); // 500
        });
    }
    else {
        console.log( err );
        next ( ApiError.unauthorized( 'Error: missing authid' )); // 401
    }   
};


/*******************************
 * VALIDATION
 * https://joi.dev/api/?v=17.6.0
 *******************************/
 function validateUser( user ) {
    const schema = Joi.object({
      dayLength: Joi.string().required(),
      add: Joi.string(),
      sub: Joi.string(),
      mul: Joi.string(),
      div: Joi.string(),
      standName: Joi.string() // may be in request when creating a stand
    });
  
    return schema.validate( user );
  }

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };