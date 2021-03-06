const constants = require( '../helpers/constants' );

const { parseSearchResultsPage } = require( '../helpers/parse' );

const searchUrl = `${constants.BASE_URL}/sr/?q=`;

module.exports.getProductsBySearch = ( req, res ) => {

  const query = req.params.query;
  const page = req.params.page;

  const url = `${searchUrl}${query}&p=${page}`;

  parseSearchResultsPage( url )
    .then( ( products ) => res.status( 200 ).json( products ) )
    .catch( () => res.status( 404 ).json( [] ) )
};