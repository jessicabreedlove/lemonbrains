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
        console.log( "OIDC code = ", req.oidc.user.sub );
        res.sendStatus( err.code ).render( 'error', { code: err.code, message: err.message });
        return;
    }

    // else 
    res.sendStatus( 500 ).render( 'error', { code: 500, message: "An unknown error has taken place." });
}

module.exports = apiErrorHandler; // make function public