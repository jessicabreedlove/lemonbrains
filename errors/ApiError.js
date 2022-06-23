/***************************************
* ApiError class
* 
* https://www.youtube.com/watch?v=DyqVqaf1KnA
* 
*/

class ApiError {

    constructor( code, message ) {
        this.code = code;
        this.message = message;

        console.log( this.code, this.message );
    }

    // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

    // The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing)
    static badRequest( message) {
        return new ApiError( 400, message);
    }

    // The request contained valid data and was understood by the server, but the server is refusing action. This may be due to the user not having the necessary permissions for a resource or needing an account of some sort, or attempting a prohibited action
    static forbidden( message) {
        return new ApiError( 403, message);
    }

    // The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
    static notFound( message) {
        return new ApiError( 404, message);
    }

    // A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
    static internalServerError( message) {
        return new ApiError( 500, message);
    }    

    // The server cannot handle the request (because it is overloaded or down for maintenance). Generally, this is a temporary state.
    static serviceUnavailable( message) {
        return new ApiError( 503, message);
    }  
}

module.exports = ApiError; // make class public