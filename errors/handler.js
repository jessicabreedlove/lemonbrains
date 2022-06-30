/***************************************
* Error handler
* 
* TODO: add description
* 
*/
const ApiError = require( './ApiError' );

function apiErrorHandler( err, req, res, next ) {

    console.log( "apiErrorHandler: ", err );

    if ( err instanceof ApiError ) {
        // res.status( err.code ).json( err.message );
        res.render( 'error', { code: err.code, message: err.message });
        return;
    }

    // else 
    res.render( 'error', { code: 500, message: "An unknown error has taken place." });
}

module.exports = apiErrorHandler; // make function public