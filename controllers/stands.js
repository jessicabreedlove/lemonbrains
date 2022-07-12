/***************************************
 * Stands controller
 * 
 * TODO: add description
 */

// includes ...
const mongodb = require( '../db/connect' );
// const Joi = require( 'joi' );
const ApiError = require( '../errors/ApiError' );

const usersController = require( '../controllers/users' );
const statisticsController = require( '../controllers/statistics' );
const leaderController = require( '../controllers/leader' );
const { ExplainVerbosity } = require('mongodb');

/***************************
// GET stand
****************************/
const getStand = async ( req, res, next ) => {
    /*
        #swagger.description = 'Get stand information';
        #swagger.responses[400] = { description: 'Unable to match authid' }
    */
    console.log( "Debug: getStand() in stands controller, authid=", req.oidc.user.sub );

    const authid = req.oidc.user.sub; // identify user based authid

    // the user should have an id but may not have an account yet
    if ( authid ) {
        // user is logged in but does not yet have an account
        await mongodb.getDb().db().collection( 'users' ).findOne( { authid: authid })
            .then( async result => {

                // user does not exist
                if (result == null) {
                    console.log( "User does not exist ... ", result );
                    // redirect to set up page
                    res.render( 'setup', { authid: authid } );
                }
                else {
                    // TO GET HERE, USER NEEDS TO BE AUTHENTICATED AND HAVE SET UP A STAND ALREADY
                    // use try/catch for synchronous request
                    try {
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
                        .toArray(function( err, result ) {
                            if ( err ) {
                                throw err;
                            }
                            else {
                                if ( result.length > 0 ) {
                                    console.log( "standName and user admin status: ", result[0].standName, result[0].userstand[0].admin );

                                    // TODO: css should be determined based on 
                                    const css = getLocation( result[0].earnings );
                                    res.render( 'stand', { css: css, authid: authid, stand: result[0].stand, day: result[0].day, earnings: result[0].earnings, admin: result[0].userstand[0].admin });
                                }
                                else {
                                    // TODO: invalid id
                                    next( ApiError.notFound( "The id you requested was not found" ));
                                }
                            }
                        });
                    }
                    catch ( err ) {
                        console.log( err );
                        next( ApiError.badRequest( "Error: invalid authid" ) );
                    }
                }
            })
            .catch ( err => {
                console.log( "Fatal Error =", err);
            });

            console.log( "baaaaaannnaaaaaaaaaannnnnaaaaaa");
    }
    else {
        console.log( err );
        next( ApiError.notFound( "Error: missing authid" ) );
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
        #swagger.parameters['standName'] = { description: 'Name of stand' }
        #swagger.responses[200] = { description: 'OK' }
        #swagger.responses[500] = { description: 'Something went wrong creating the stand' }
    */
        console.log( "Debug: createStand() in stands controller = ", req );
        
        const { standName, dayLength, add, sub, mul, div } = req.body;
        console.log( "req.body=", standName, dayLength, add, sub, mul, div );

        // TODO
        // 1. get auth info from request
        // const authid = req.body.authid;
        const authid = req.oidc.user.sub;

        // 2. TODO create user ... call createUser()
        await usersController.createUser( req ); 

        // 3. get stand name from request
        const standName = req.body.standName;

        console.log( `authid=${authid}, standName=${standName}` );
        // res.send( `authid=${authid}, stand=${standName}` ); 
        // construct an object
        const stand = {
            authid: authid, // TODO: decide to store authid or userid in stand and statistics ???
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
                    // const standid = result.insertedId.toString();
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
                    // res.redirect( 200, `/stands/${authid}` );
                    getStand( req, res, next );
                }
                else {
                    next( ApiError.internalServerError( "An error occured after creating the stand" ));
                }
            })
            .catch( err => {
                console.log( err );
                next( ApiError.internalServerError( "An error occured while creating the stand" ));
            });
};

/***************************
// POST update stand
****************************/
const updateStand = async ( req, res, next ) => {
    /*
        #swagger.description = 'Update stand information';
        #swagger.parameters['stand'] = { description: 'Name of stand' };
        #swagger.parameters['day'] = { description: 'Number of days played' };
        #swagger.parameters['earnings'] = { description: 'Earnings to date' };
        #swagger.parameters['addCount'] = { description: 'Number of addtion questions asked' };
        #swagger.parameters['addCorrect'] = { description: 'Number of addtion questions answered correctly' };
        #swagger.parameters['subCount'] = { description: 'Number of subtration questions asked' };
        #swagger.parameters['subCorrect'] = { description: 'Number of subtraction questions answered correctly' };
        #swagger.parameters['mulCount'] = { description: 'Number of multiplication questions asked' };
        #swagger.parameters['mulCorrect'] = { description: 'Number of multiplication questions answered correctly' };
        #swagger.parameters['divCount'] = { description: 'Number of division questions asked' };
        #swagger.parameters['divCorrect'] = { description: 'Number of division questions answered correctly' };
        #swagger.responses[200] = { description: 'OK' }
        #swagger.responses[500] = { description: 'Something went wrong trying to update the stand' }

    */
        console.log( "Debug: updateStand() in stands controller" );
        // res.send( "updateStand() called" ); 

        // 1. get auth info from request
        // 2. get op and earnings from request
        const authid = req.oidc.user.sub;
        const { addCount, addCorrect, subCount, subCorrect, mulCount, mulCorrect, divCount, divCorrect } = req.body;
        console.log( `authid=${authid}, addCount=${addCount}, addCorrect=${addCorrect}, subCount=${subCount}, subCorrect=${subCorrect}, mulCount=${mulCount}, mulCorrect=${mulCorrect}, divCount=${divCount}, divCorrect=${divCorrect} ` );

        // 3. update stand with new day and earning information
        //await mongodb.getDb().db().collection( 'stands' ).find({}, { projection: { userid: id } }).toArray()
        //await mongodb.getDb().db().collection( 'stands' ).findOne( { authid: authid }, { authid: 1, days: 1, earnings: 1 })
        await mongodb.getDb().db().collection( 'stands' ).findOne( { authid: authid })
            .then( async result => {
                console.log( "Update stand ... ", result );

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
                mongodb.getDb().db().collection( 'stands' ).updateOne( { authid: authid }, update, function( err, res ) {
                    if ( err ) {
                        console.log( "0 document updated" );
                        throw err;
                    }
                    else{
                        console.log( "1 document updated" );
                    }
                });

                // 5: update leader board
                await leaderController.updateBoard( authid, day, totalEarnings );
            })
            .catch ( err => {
                console.log( "Fatal Error =", err);
            });
        
        // 6. redirect to stand
        // res.redirect( 200, `/stands/${authid}` );
        getStand( req, res, next );
};

/***************************
// PRIVATE return css that matches players earnings
****************************/
function getLocation( earnings ) {

    let css = "style";

    // TODO: query locations collection and get matching style
    if ( earnings > 10 ) {
        css = "style2";
    }

    return css;
}

module.exports = { getStand, createStand, updateStand };