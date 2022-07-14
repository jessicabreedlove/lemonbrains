/***************************************
 * Statistics controller
 * 
 * Manage addition, subtraction, multiplication, division stats for each stand
 */

// includes ...
const mongodb = require( '../db/connect' );
const Joi = require( 'joi' );
const ApiError = require( '../errors/ApiError' );

/***************************
// UPDATE statistic
****************************/
const updateStat = async ( update ) => {

    console.log( "Debug: updateStat", update.authid, update.op, update ); // TODO: why can't I access an object property ???

    mongodb.getDb().db().collection( 'statistics' ).findOne( { authid: update.authid, op: update.op }, { count: 1, correct: 1 })
        .then( async result => {
            console.log( `PROCESS ${update.op} stat: `, result );

            const stat = { $set: {
                authid: update.authid,
                op: update.op,
                count: result.count + parseInt( update.count ),
                correct: result.correct + parseInt( update.correct )
            }};

            await mongodb.getDb().db().collection( 'statistics' ).updateOne( { authid: update.authid, op: update.op }, stat, { upsert: true });

        })
        .catch ( err => {
            console.log( "Fatal Error =", err );
        });
};


/***************************
// CREATE statistic (rubric)
****************************/
const createStat = async ( req, res, next ) => {
    /*
    #swagger.description = 'Create statistic with hard coded authid, safe for testing'
    #swagger.responses[201] = { description: 'The stat was created' }
    #swagger.responses[400] = { description: 'Bad request, make sure inputs are strings' }
    #swagger.responses[401] = { description: 'Unauthorized access' }
    #swagger.responses[500] = { description: 'Undocumented error, are you certain you\'re logged in?' }
    #swagger.parameters['body'] = {
                in: 'body',
                description: 'op can be add, sub, mul, or div',
                schema: {
                    $op: 'add',
                    $count: '10',
                    $correct: '10'
                }
            };    
    */
    console.log( "Debug: createStat() in statistics controller" );

    const authid = req.oidc.user.sub; // authenticated id

    if ( authid ) {

        // VALIDATION
        const { error } = validateStat( req.body );

        if ( error ) {
            next( ApiError.badRequest( 'Invalid statistic data: ' + error.details[0].message ));
            return;
        }

        const userid = 'rubric'; // id of the user to delete

        const stat = {
            authid: 'oauth-rubric',
            op: req.body.op,
            count: req.body.count,
            correct: req.body.correct
        };

        // use then/catch for asynchronous code
        await mongodb.getDb().db().collection( 'statistics' ).insertOne( stat )
        .then (result => {
            if ( result.acknowledged ) {
                console.log( result ); // 
                res.sendStatus( 201 );
            }
            else {
                next( ApiError.internalServerError( 'An error occured after creating the stat, it must be the zombie apocalypse' )); // 500
            }
        })
        .catch( err => {
            console.log( err );
            next( ApiError.internalServerError( 'An error occured while creating the stat, it must be the zombie apocalypse' )); // 500
        });

    }
    else {
        console.log( err );
        next ( ApiError.unauthorized( "Error: missing authid" )); // 401
    }  
};

/***************************
// DELETE statistic (rubric)
****************************/
const deleteStat = async ( req, res, next ) => {
    /*
    #swagger.description = 'Delete statistic with hard coded authid, safe for testing'
    #swagger.responses[201] = { description: 'The stat was deleted' }
    #swagger.responses[400] = { description: 'Bad request, make sure inputs are strings' }
    #swagger.responses[401] = { description: 'Unauthorized access' }
    #swagger.responses[404] = { description: 'Unable to find stat' }
    #swagger.responses[500] = { description: 'Undocumented error, are you certain you\'re logged in?' }
    #swagger.parameters['body'] = {
                in: 'body',
                description: 'id to lookup',
                schema: {
                    $authid: 'oauth-rubric',
                }
            };       
    */
    console.log( "Debug: deleteStat() in statistics controller" );

    const authid = req.oidc.user.sub; // authenticated id

    if ( authid ) {
        const userid = req.body.authid; // id of the user to delete

        // use then/catch for asynchronous code
        await mongodb.getDb().db().collection( 'statistics' ).deleteOne({ authid: userid })
        .then ( result => {
            console.log( "Deleted user = ", result );

            if ( result.deletedCount == 0 ) {
                res.sendStatus( 404 );
            }
            else {
                res.sendStatus( 200 );
            }
        })
        .catch ( err => {
            next( ApiError.internalServerError( 'An error occurred while deleting the stat, it must be the zombie apocalypse' )); // 500
        });
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
function validateStat( statistic ) {
    const schema = Joi.object({
        op: Joi.string().required(),
        count: Joi.string().required(),
        correct: Joi.string().required()
    });

    return schema.validate( statistic );
}

module.exports = { updateStat, createStat, deleteStat };