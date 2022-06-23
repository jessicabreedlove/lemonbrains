/***************************************
* MongoDB connection
* 
* https://www.npmjs.com/package/mongodbç
* 
* Brother Birch referenced the code below in one of his lessons
* https://stackoverflow.com/questions/58354629/moving-nodejs-mongodb-connection-code-to-another-file
*/
const mongoClient = require( 'mongodb' ).MongoClient;

let _db;

const initDb = ( callback ) => {
  if ( _db ) {
    console.log( 'Db is already initialized!' );
    return callback( null, _db );
  }
  mongoClient.connect( process.env.MONGO_URI )
    .then( async client => {
      _db = client;

      // make the appropriate DB calls
      // await listDatabases( client );

      callback( null, _db );
    })
    .catch( err => {
      callback( err );
    });
};

const getDb = () => {
  if ( !_db ) {
    throw Error( 'Db not initialized' );
  }
  return _db; // return connection
};

// DEBUG: verify that the db connection is working
async function listDatabases( client ) {
  databasesList = await client.db().admin().listDatabases();

  console.log( "Debug: Databases:" );
  databasesList.databases.forEach( db => console.log( ` - ${db.name}` ));
};

module.exports = { initDb, getDb };