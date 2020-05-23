const constants = require( '../helpers/constants' );
const Offer = require( '../models/Offer' );
const moment = require( 'moment' );

const PuppeteerHandler = require( '../helpers/puppeteer' );

const { parseOffersResultsPage } = require( '../helpers/parse' );

module.exports.getProductByOffers = ( req, res ) => {

  const puppeteer = new PuppeteerHandler();

  const category = req.params.category;
  const product = req.params.product;

  const url = `${constants.BASE_URL}/${category}/${product}/prices`;

  ( async () => {

    const findOffer = await Offer.findOne( { id: `${category}/${product}` } );

    if ( findOffer && findOffer.dateCreated ) {

      const dateCreated = moment( new Date( findOffer.dateCreated ) );
      const dateNow = moment( new Date() );
      const dateDiff = dateNow.diff( dateCreated, 'days' );

      if ( dateDiff < 2 ) {
        try {
          res.status( 200 ).json( findOffer );
        } catch ( e ) {
          res.status( 404 ).json( { message: 'Something wrong' } );
        }
      } else {

        const pageContent = await puppeteer.getPageContent( url );

        parseOffersResultsPage( pageContent )
          .then( data => {

            const filter = {
              id: `${category}/${product}`
            };

            const update = {
              list: data.list,
              productImage: data.productImage,
              dateCreated: new Date(),
            };

            Offer.findOneAndUpdate( filter, update, { new: true } )
              .then( ( data ) => {
                res.status( 200 ).json( data );
              } );
          } )
          .catch( () => res.status( 404 ).json( { message: 'Something wrong' } ) )
      }
    } else {

      const pageContent = await puppeteer.getPageContent( url );

      parseOffersResultsPage( pageContent, category, product )
        .then( data => {

          new Offer( {
            list: data.list,
            productImage: data.productImage,
            productTitle: data.productTitle,
            productDescription: data.productDescription,
            id: `${category}/${product}`,
            dateCreated: new Date(),
          } ).save();

          res.status( 200 ).json( data );

        } )
        .catch( () => res.status( 404 ).json( { message: 'Something wrong' } ) )
    }

  } )();
};

module.exports.sortProductByOffers = async ( req, res ) => {

  const id = `${req.params.category}/${req.params.product}`;
  const order = req.params.order;

  const { list } = await Offer.findOne( { id } );

  if ( order === 'asc' ) {

    const ascOffers = list.sort( ( a, b ) => {
      return a.price - b.price;
    } );

    res.status( 200 ).json( ascOffers );

  } else if ( order === 'desc' ) {

    const descOffers = list.sort( ( a, b ) => {
      return b.price - a.price;
    } );

    res.status( 200 ).json( descOffers );

  } else {
    res.status( 404 ).json( { message: 'Not found' } )
  }

};