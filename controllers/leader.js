/***************************************
 * Leadercontroller
 * 
 * Mange front page leader board
 */

// includes ...
const mongodb = require( '../db/connect' );
const Joi = require( 'joi' );
const ApiError = require( '../errors/ApiError' );


/***************************************
 * TODO: query leader-board collection and return all documents
***************************************/
const getLeaders = async ( req, res ) => {
    console.log( "Debug: getLeaders()" );
    //res.send( "createLeader() called" ); 

    mongodb.getDb().db().collection( 'leader_board' ).find({}).toArray( function( err, result ) {
        console.log( "leader board=", result[0].board ); // array of objects

        // TODO: can I just access object without converting to array???
        if ( err ) {
            console.log( "Fatal Error =", err );
        }
        else {
            res.render( 'index', { leaders: result[0].board });
        }
    });
};

/***************************
// Update the leader board
****************************/
const updateBoard = async  ( authid, stand, day, earnings ) => {

    console.log( "Debug: updateBoard()" );
    // res.send( "updateBoard() called" );

    // 1. get current leader board
    await mongodb.getDb().db().collection( 'leader_board' ).find({}).toArray()
    .then( async result => {
        //console.log( "leader board", result );
        let board = result[0].board;
        console.log( "The board", board );

        // 2. add new stat (look for same authid)
        const score = { 
            authid: authid,
            stand: stand,
            day: day,
            earnings: earnings
        };

        let onboard = false;
        // check for matching authid
        for ( let i = 0; i < board.length; i++ ) {
            console.log( `Leader: ${i}: result1 ${board[i].authid} == result2 ${authid}` );
            if ( board[i].authid == authid ) {
                board[i] = score;
                onboard = true;
                console.log( "onboard = true");
            }
        }
        // add score if user isn't already on the board
        if ( !onboard ) {
            console.log( 'push...', score );
            board.push( score );
        }

        // 3. sort

        // 4. delete current board ??
        
        // 5. save new board (to 10)
        console.log( "Updated board", result );

        mongodb.getDb().db().collection( 'leader_board' ).updateOne( { _id: result[0]._id }, { $set: { board: board }});  
    })
    .catch ( err => {
        console.log( "Fatal Error =", err);
    });        
};

/***************************
// POST board

{"_id":{"$oid":"62b41fdbb43b6e0bdf85695f"},"board":[{"authid":"auth0|62a0d6a5721721d661982d07","day":{"$numberInt":"22"},"earnings":{"$numberInt":"384"}}]}

****************************/
const createBoard = async ( req, res, next ) => {
    /*
        #swagger.description = 'Create board with hard coded _id, safe for testing
        #swagger.responses[201] = { description: 'The board was created' }
        #swagger.responses[401] = { description: 'Unauthorized access' }
        #swagger.responses[404] = { description: 'Unable to find board' }
        #swagger.responses[500] = { description: 'Undocumented error, are you certain you\'re logged in?' }
    */
    console.log( "Debug: createBoard()" );
       
    const authid = req.oidc.user.sub; // authenticated id

    if ( authid ) {
/*
          // JOIN two tables https://hevodata.com/learn/mongodb-join-two-collections/
          await mongodb.getDb().db().collection('stands').aggregate([
              {
                $match: {
                  authid: authid,
                },
              },
              {
                $lookup: {
                  from: 'users', // second collection
                  localField: 'authid',
                  foreignField: 'authid',
                  as: 'userstand', // new collection
                },
              },
            ])
            .toArray()
            .then ( result => {
                // throw new Error("Intentional error");
                console.log( result );
                if (result.length > 0) {

                    let board = []; // empty array
                    let score = {}; // empty object

                    for ( let i = 0; i < result.length; i++ ) {

                        // create object
                        // add to board

                        console.log( 'standName and user admin status: ', result[i].standName, result[i].day, result[i].earnings );
                    }

                    // save board
                   await mongodb.getDb().db().collection( 'leader_board' ).insertOne( { "_id" : "TEST" } );
                    // await mongodb.getDb().db().collection( 'leader_board' ).insertOne( { "_id" : "TEST", board: board } );
                    
                    res.sendStatus( 200 );
                  }
                  else {
                    // TODO: invalid id
                    next( ApiError.notFound('The id you requested was not found' )); // 404
                  }            })
            .catch ( err => {
                // handle db related errors
                console.log( err );
                // res.status( 500 ).json( err || 'An error occurred while getting users.' );
                next( ApiError.internalServerError( err )); // 500
            });
*/

        await mongodb.getDb().db().collection( 'stands' ).find({}).toArray()
        .then( async result => {
            console.log( result );
            res.sendStatus( 200 );
            let board = []; // empty array
            let score = {}; // empty object
            await mongodb.getDb().db().collection( 'leader_board' ).insertOne( { "_id" : "TEST" } );

            // loop stands and create an object 
/*            for ( ... ) {
                // get data from each to create object
                score = { 
                    authid: authid,
                    stand: stand,
                    day: day,
                    earnings: earnings
                }; 
                
                board.push( score );
            }

            // insert board
            await mongodb.getDb().db().collection( 'leader_board' ).insertOne( { "_id" : ObjectId("TEST"), board: board } );
*/
        })
        .catch ( err => {
            console.log( "Fatal Error =", err);
        });
    }
    else {
        console.log( err );
        next ( ApiError.unauthorized( "Error: missing authid" )); // 401
    }       
};

/***************************
// DELETE board
****************************/
const deleteBoard = async ( req, res ) => {
    /*
        #swagger.description = 'Delete board with hard coded _id, safe for testing
        #swagger.responses[201] = { description: 'The board was deleted' }
        #swagger.responses[401] = { description: 'Unauthorized access' }
        #swagger.responses[404] = { description: 'Unable to find board' }
        #swagger.responses[500] = { description: 'Undocumented error, are you certain you\'re logged in?' }
    */
    console.log( "Debug: deleteBoard()" );

    const authid = req.oidc.user.sub; // authenticated id

    // 
    if ( authid ) {
        // use then/catch for asynchronous code
        await mongodb.getDb().db().collection( 'leader_board' ).deleteOne({ _id: "TEST" })
        .then ( result => {
            console.log( "Deleted board = ", result );

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
    else {
        console.log( err );
        next ( ApiError.unauthorized( "Error: missing authid" )); // 401
    }        
};


module.exports = { getLeaders, updateBoard, createBoard, deleteBoard };