/***************************************
 * Leadercontroller
 * 
 * TODO: add description
 */

// includes ...
const mongodb = require( '../db/connect' );
// const Joi = require( 'joi' );
const ApiError = require( '../errors/ApiError' );


/***************************************
 * TODO: query leader-board collection and return all documents
***************************************/
const getLeaders = async ( req, res ) => {
    console.log( "Debug: getLeader()" );
    //res.send( "createLeader() called" ); 

    mongodb.getDb().db().collection( 'leader_board' ).find({}).toArray( function( err, result ) {
        console.log( "leaders=", result ); // array of objects

        // TODO: can I just access object without converting to array???
        if( err ) {
            console.log( "Fatal Error =", err );
        }
        else {
            res.render( 'index', { test: "TEST", user: {name: "TEST OBJECT"}, leaders: result });
        }
    });
};

/***************************
// TODO: add description
****************************/
const updateBoard = async  ( authid, day, earnings ) => {

    console.log( "Debug: updateBoard()" );
    // res.send( "updateBoard() called" );

    // 1. get board results
    mongodb.getDb().db().collection( 'leader_board' ).find({}).toArray( function( err, result ) {
        console.log( "leaders=", result ); // array of objects

        // TODO: can I just access object without converting to array???
        if( err ) {
            console.log( "Fatal Error =", err );
        }
        else {
            // 2. add new stat (look for same authid)
            const score = { 
                authid: authid,
                day: day,
                earnings: earnings
            };

            console.log( "score=", score);

            let onboard = false;
            // check for matching authid
            for ( let i = 0; i < result.length; i++ ) {
                console.log( `Leader: ${i}: result1 ${result[i].board.authid} == result2 ${authid}` );
                if ( result[i].board.authid == authid ) {
                    result[i].board = score;
                    onboard = true;
                    console.log( "onboard = true");
                }
            }
            // add score if user isn't already on the board
            if ( !onboard ) {
                console.log('push...');
                result.push( score );
            }

            console.log( result );
            // 3. sort

            // 4. delete current board
            
            // 5. save new board (to 10)
            console.log( "Updated board", result );

            mongodb.getDb().db().collection( 'leader_board' ).updateOne( { _id: result[0]._id }, { $set: { board: result }});            
        }
    });
};

module.exports = { getLeaders, updateBoard };