/***************************************
 * Stands controller
 * 
 * Manage stands
 */

// includes ...
const mongodb = require( '../db/connect' );
const Joi = require( 'joi' );
const ApiError = require( '../errors/ApiError' );

const usersController = require( '../controllers/users' );
const statisticsController = require( '../controllers/statistics' );
const leaderController = require( '../controllers/leader' );
//const { ExplainVerbosity } = require('mongodb'); how did this get here ?

/***************************
// GET stand
****************************/
const getStand = async ( req, res, next ) => {
    /*
        #swagger.description = 'Get stand information';
        #swagger.responses[200] = { description: 'Get stand' }
        #swagger.responses[401] = { description: 'Unauthorized access' }        
        #swagger.responses[404] = { description: 'Unable to find stand' }
        #swagger.responses[500] = { description: 'Undocumented error, are you certain you\'re logged in?' }        
    */
    console.log( "Debug: getStand() in stands controller" );

    const authid = req.oidc.user.sub; // identify user based authid

    // the user should have an id but may not have an account yet
    if ( authid ) {
        // user is logged in but does not yet have an account
        await mongodb.getDb().db().collection( 'users' ).findOne( { authid: authid })
        .then( async result => {

            // user does not exist
            if ( result == null ) {
                console.log( "User does not exist ... ", result );
                // redirect to set up page
                res.render( 'setup', { authid: authid } );
                next();
            }
            else {
                // TO GET HERE, USER NEEDS TO BE AUTHENTICATED AND HAVE SET UP A STAND ALREADY
                // use try/catch for synchronous request
                // use then/catch for asynchronous code

                // JOIN two tables https://hevodata.com/learn/mongodb-join-two-collections/
                await mongodb.getDb().db().collection( 'stands' ).aggregate([
                    {
                        $match: {
                            authid: authid
                        }
                    },
                    { $lookup: {
                        from: 'users', // second collection
                        localField: 'authid',
                        foreignField: 'authid',
                        as: 'userstand' // new collection
                    }}
                ])
                .toArray( function( err, result ) {
                    if ( err ) {
                        console.log( "Debug: getStand() error", err );
                        throw err;
                    }
                    else {
                        if ( result.length > 0 ) {
                            console.log( "standName and user admin status: ", result[0].standName, result[0].userstand[0].admin );

                            // TODO: css should be determined based on 
                            const css = getLocation( result[0].earnings );
                            res.status( 200 ).render( 'stand', { css: css, authid: authid, stand: result[0].stand, day: result[0].day, earnings: result[0].earnings, admin: result[0].userstand[0].admin });
                            next();
                        }
                        else {
                            // TODO: invalid id
                            next( ApiError.notFound( "The id you requested was not found" )); // 404
                        }
                    }
                });
            }
        })
        .catch ( err => {
            console.log( "Fatal Error =", err);
            next( ApiError.internalServerError( 'An error occured after creating the stand, it must be the zombie apocalypse' )); // 500
        });
    }
    else {
        console.log( err );
        next ( ApiError.unauthorized( "Error: missing authid" )); // 401
    }

    // next can be returned or called but it can´t be called after a function like redirect(), render(), send(), sendFile(), json()
    // https://bobbyhadz.com/blog/javascript-error-cannot-set-headers-after-they-are-sent-to-client    
    // next(); 
};

/***************************
// POST set up stand
****************************/
const createStand = async ( req, res, next ) => {
    /*
        #swagger.description = 'Create stand';
        #swagger.responses[201] = { description: 'Stand created' }
        #swagger.responses[400] = { description: 'Bad request, make sure inputs are strings' }
        #swagger.responses[401] = { description: 'Unauthorized access' }
        #swagger.responses[500] = { description: 'Something went wrong creating the stand, it must be the zombie apocalypse' }
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                description: 'Create a new stand',
                schema: {
                    $standName: 'Nom, Nom, Nom',
                    $dayLength: 60,
                    $add: 'on',
                    $sub: 'on',
                    $mul: '0',
                    $div: '0'
                }
            };            
    */
    console.log( "Debug: createStand() in stands controller" );

    // 1. get auth info from request
    const authid = req.oidc.user.sub;
    
    if ( authid ) {
        
        // VALIDATION
        const { error } = validateCreate( req.body );

        if ( error ) {
            next( ApiError.badRequest( 'Invalid stand data: ' + error.details[0].message ));
            return;
        }

        const { standName, dayLength, add, sub, mul, div } = req.body;
        console.log( "req.body=", standName, dayLength, add, sub, mul, div );

        // 2. create user ... call createUser()
        await usersController.createUser( req, res, next ); 

        // 3. construct an object
        const stand = {
            authid: authid,
            standName: standName,
            day: 0,
            earnings: 0
        };

        // 4. create stand
        // use then/catch for asynchronous code
        await mongodb.getDb().db().collection( 'stands' ).insertOne( stand )
        .then (result => {
            if ( result.acknowledged ) {
                // 5. create stats
                console.log( result ); // 
                console.log( "create stats" );
                const authid = req.oidc.user.sub;
                // set up 
                const operations = ["add", "sub", "mul", "div"];
                operations.forEach( async op => {
                    console.log( op );
                    // define new stat
                    let stat = { 
                        authid: authid,
                        op: op,
                        count: 0,
                        correct: 0
                    };

                    // await statisticsController.updateStat( stat );
                    // https://www.mongodbtutorial.org/mongodb-crud/mongodb-insertone/
                    await mongodb.getDb().db().collection( 'statistics' ).insertOne( stat );
                });

                // redirect to new stand
                // ... on click, matching stand should be found and displayed
                getStand( req, res, next );
            }
            else {
                next( ApiError.internalServerError( 'An error occured after creating the stand, it must be the zombie apocalypse' )); // 500
            }
        })
        .catch( err => {
            console.log( err );
            next( ApiError.internalServerError( 'An error occured while creating the stand, it must be the zombie apocalypse' )); // 500
        });
    }
    else {
        console.log( err );
        next ( ApiError.unauthorized( "Error: missing authid" )); // 401
    }        
};

/***************************
// POST update stand
****************************/
const updateStand = async ( req, res, next ) => {
    /*
        #swagger.description = 'Update stand information';
        #swagger.responses[200] = { description: 'Ok' }
        #swagger.responses[400] = { description: 'Bad request, make sure inputs are strings' }
        #swagger.responses[401] = { description: 'Unauthorized access' }
        #swagger.responses[404] = { description: 'Unable to find stand' }
        #swagger.responses[500] = { description: 'Something went wrong updating the stand, it must be the zombie apocalypse' }
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                description: 'Update stand',
                schema: {
                    $addCount: '0',
                    $addCorrect: '0',
                    $subCount: '0',
                    $subCorrect: '0',
                    $mulCount: '0',
                    $mulCorrect: '0',
                    $divCount: '0',
                    $divCorrect: '0',
                }
            };          
    */
    console.log( "Debug: updateStand() in stands controller" );

    // 1. get auth info from request
    const authid = req.oidc.user.sub;

    if ( authid ) {

        // VALIDATION
        const { error } = validateUpdate( req.body );

        if ( error ) {
            next( ApiError.badRequest( 'Invalid stand data: ' + error.details[0].message ));
            return;
        }

        // 2. get counts and correct from request
        const { addCount, addCorrect, subCount, subCorrect, mulCount, mulCorrect, divCount, divCorrect } = req.body;
        console.log( `authid=${authid}, addCount=${addCount}, addCorrect=${addCorrect}, subCount=${subCount}, subCorrect=${subCorrect}, mulCount=${mulCount}, mulCorrect=${mulCorrect}, divCount=${divCount}, divCorrect=${divCorrect} ` );

        // 3. update stand with new day and earning information
        await mongodb.getDb().db().collection( 'stands' ).findOne( { authid: authid })
        .then( async result => {
            console.log( "Update stand ... ", result );

            // stand does not exist
            if ( result == null ) {
                next( ApiError.notFound( "Error: missing authid" ) ); // 404
            }

            let earnings = 0; // TODO: review formula

            // 4. update statistics with new op, count, correct
            // TODO: feels like there should be a way to loop these 4 checks using a single array ...

            // ADD STATISTIC
            if ( addCount > 0 ) {
                const update = {
                    authid: result.authid,
                    op: "add",
                    count: parseInt( addCount ),
                    correct: parseInt( addCorrect )
                };

                await statisticsController.updateStat( update );

                // update earnings
                earnings += parseInt( addCorrect ); // number of correct * 1
                console.log( `add ${addCorrect} * 1 = ${addCorrect} | earings=${earnings}` );
            }

            // SUB STATISTIC
            if ( subCount > 0 ) {
                const update = {
                    authid: result.authid,
                    op: "sub",
                    count: parseInt( subCount ),
                    correct: parseInt( subCorrect )
                };

                await statisticsController.updateStat( update );

                // update earnings
                earnings += parseInt( subCorrect ) * 2; // number of correct * 2
                console.log( `sub ${subCorrect} * 2 = ${subCorrect * 2} | earings=${earnings}` );
            }

            // MUL STATISTIC
            if ( mulCount > 0 ) {
                const update = {
                    authid: result.authid,
                    op: "mul",
                    count: parseInt( mulCount ),
                    correct: parseInt( mulCorrect )
                };

                await statisticsController.updateStat( update );

                // update earnings
                earnings += parseInt( mulCorrect ) * 3; // number of correct * 3
                console.log( `mul ${mulCorrect} * 3 = ${mulCorrect * 3} | earings=${earnings}` );
            }

            // DIV STATISTIC
            if ( divCount > 0 ) {
                const update = {
                    authid: result.authid,
                    op: "div",
                    count: parseInt( divCount ),
                    correct: parseInt( divCorrect )
                };

                await statisticsController.updateStat( update );

                // update earnings
                earnings += parseInt( divCorrect ) * 4; // number of correct * 4
                console.log( `div ${divCorrect} * 4 = ${divCorrect * 4} | earings=${earnings}` );
            }

            // https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/
            const day = result.day + 1;
            const totalEarnings = result.earnings + parseInt( earnings ); // TODO: come up with some calculation e.g. 1 point for add, 2 for sub, 3 for mul, 4 for div
            
            const update = { $set: {
                day: day,
                earnings: totalEarnings
            }};

            console.log( `Total=${earnings} + ${result.earnings} == ${totalEarnings}` );

            console.log( "stands collection updateOne", update );
            await mongodb.getDb().db().collection( 'stands' ).updateOne( { authid: authid }, update )
            .then ( result => {
                if ( result.acknowledged ) {
                    console.log( "Stand has been updated correctly" );
                    //res.setHeader( 'Content-Type', 'application/json' );
                    //res.status( 201 ).json( result );
                    //next();
                    // 6. redirect to stand
                    getStand( req, res, next );
                }
                else {
                    next( ApiError.internalServerError( 'An error occurred after updating the stand, it must be the zombie apocalypse' )); // 500
                }
            })
            .catch ( err => {
                next( ApiError.internalServerError( 'An error occurred while updating the stand, it must be the zombie apocalypse' )); // 500
            });

            // 5: update leader board
            await leaderController.updateBoard( authid, result.standName, day, totalEarnings );
        })
        .catch ( err => {
            next( ApiError.internalServerError( 'An error occured after creating the stand, it must be the zombie apocalypse' )); // 500
        });
    }
    else {
        console.log( err );
        next ( ApiError.unauthorized( 'Error: missing authid' )); // 401
    }
};

/***************************
// PRIVATE return css that matches players earnings
****************************/
function getLocation( earnings ) {

    let css = "style";

    // TODO: query locations collection and get matching style
    if ( earnings > 10 ) {
        css = "style"; // TODO: change stylesheet based on stand earnings
    }

    return css;
}

/***************************
// DELETE stand (added for rubric)
****************************/
const deleteStand = async ( req, res ) => {
    /*
        #swagger.description = 'Delete stand
        #swagger.responses[200] = { description: 'The stand was deleted' }
        #swagger.responses[401] = { description: 'Unauthorized access' }
        #swagger.responses[404] = { description: 'Unable to find stand' }
        #swagger.responses[500] = { description: 'Undocumented error, are you certain you\'re logged in?' }
    */

    const authid = req.oidc.user.sub; // authenticated id

    if ( authid ) {
        try {
            const userid = req.params.id; // id of the user to delete
    
            // use then/catch for asynchronous code
            await mongodb.getDb().db().collection( 'stands' ).deleteOne({ authid: userid })
            .then ( result => {
                console.log( "Deleted stand = ", result );

                if ( result.deletedCount == 0 ) {
                    res.sendStatus( 404 );
                }
                else {
                    res.setHeader( 'Content-Type', 'application/json' );
                    res.status( 201 ).json( result );
                }
            })
            .catch ( err => {
                next( ApiError.internalServerError( 'An error occurred while deleting the stand, it must be the zombie apocalypse' )); // 500
            });
        }
        catch ( err ) {
            next ( ApiError.notFound( "Error: invalid id" )); // 404
        }
    }
    else {
        console.log( err );
        next ( ApiError.unauthorized( "Error: missing authid" )); // 401
    }      
};

/*******************************
* VALIDATION
* https://joi.dev/api/?v=17.6.0
*******************************/
function validateCreate( stand ) {
    const schema = Joi.object({
        standName: Joi.string().required(),
        dayLength: Joi.string().required()
    });

    return schema.validate( stand );
}

function validateUpdate( stand ) {
    const schema = Joi.object({
        addCount: Joi.string().required(),
        addCorrect: Joi.string(),
        subCount: Joi.string().required(),
        subCorrect: Joi.string(),
        mulCount: Joi.string().required(),
        mulCorrect: Joi.string(),
        divCount: Joi.string().required(),
        divCorrect: Joi.string()
    });

    return schema.validate( stand );
}


module.exports = { getStand, createStand, updateStand, deleteStand };