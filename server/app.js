const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const keys = require( './config/keys' );
const cors = require( 'cors' );

const searchRoutes = require( './routes/search' );
const offersRoutes = require( './routes/offers' );

const app = express();

mongoose.connect( keys.mongoURI, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true } )
  .then( () => console.log( 'Connect to MongoDB done!' ) )
  .catch( ( err ) => console.log( err ) );

app.use( cors() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

app.use( '/api/search', searchRoutes );
app.use( '/api/offers', offersRoutes );

module.exports = app;