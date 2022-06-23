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
// TODO: add description
****************************/
const updateRole = async ( req, res ) => {
    /*
        #swagger.description = 'Set user admin role to be true or false';
    */

    // TODO: function should identify user in 'users' and toggle admin field to be true or false
    console.log( "Debug: updateRole" );
    res.send( "updateRole() called" ); 
};

/***************************
// TODO: add description
****************************/
const deleteUser = async ( req, res ) => {
    /*
        #swagger.description = 'Delete user, stand, and related statistics ';
    */

    // TODO: function should delete user, stand, statistics for the specified user
    console.log( "Debug: deleteLocation" );
    res.send( "deleteLocation() called" ); 
};

module.exports = { getLocations, createLocation, updateRole, deleteUser };