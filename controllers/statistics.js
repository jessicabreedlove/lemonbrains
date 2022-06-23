/***************************************
 * Statistics controller
 * 
 * Manage addition, subtraction, multiplication, division stats for each stand
 */

// includes ...
const mongodb = require( '../db/connect' );
// const Joi = require( 'joi' );
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

module.exports = { updateStat };