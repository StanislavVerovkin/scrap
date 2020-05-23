const axios = require( 'axios' );
const cheerio = require( 'cheerio' );
const constants = require( '../helpers/constants' );

const parseSearchResultsPage = async ( url ) => {

  const products = {
    list: [],
    total_count: 0,
  };

  const { data } = await axios( url );

  const $ = await cheerio.load( data );

  const totalCount = await $( '.h2' ).text().match( /(\d+)/ )[ 0 ];

  $( '.product-item' ).each( ( i, element ) => {

    const $element = $( element );

    const title = $element.find( '.item-info > p > a' ).text().trim();
    const description = $element.find( '.item-info .text > p' ).text().trim();
    const image = $element.find( '.img-product' ).attr( 'src' );
    const price = $element.find( 'div.item-price.stick-bottom > div:nth-child(1) > div.price-md > span' ).text().replace( 'грн', '' );
    const priceDiapason = $element.find( 'div.item-price.stick-bottom > div:nth-child(1) > div.text-sm' ).text().trim().replace( 'грн', '' );
    const offersUrl = $element.find( 'div.item-price.stick-bottom > div:nth-child(2) > a' ).attr( 'href' ).replace( /\/$/, '' );

    const product = {
      title,
      description,
      price: `${price} UAH`,
      priceDiapason: `${priceDiapason} UAH`,
      image: `${constants.BASE_URL}/${image}`,
      offersUrl,
    };

    products.list.push( product );

  } );

  products.total_count = totalCount ? parseInt( totalCount, 10 ) : products.list.length;

  return products;

};

const parseOffersResultsPage = async ( pageContent ) => {

  const data = {
    list: [],
    productImage: '',
    productTitle: '',
    productDescription: '',
  };

  const $ = await cheerio.load( pageContent );

  const productImage = $( 'div.zg-canvas-box-img > img' ).attr( 'src' );
  const productTitle = $( 'div.heading > h1' ).text().trim();
  const productDescription = $( 'div.resume-info.cell-6.cell-sm > div > div:nth-child(2) > div > div.text' ).text().trim();

  await $( '.offers-item' ).each( ( i, element ) => {

    const $element = $( element );

    const storeImage = $element.find( 'div.shop-box > div > div.cell-5.cell-md > a > img' ).attr( 'src' );
    const title = $element.find( 'div.shop-box > div > div.shop-box-in.cell-7.cell-md > div.shop-box-in-title' ).text();
    const rating = $element.find( 'div.shop-box-in.cell-7.cell-md > div:nth-child(2) > span' ).text();
    const guarantee = $element.find( 'div.product-box > div > div.cell-2.cell-md.m_b-sm' ).text().trim();
    const storeUrl = $element.find( 'div.product-box > div > div:nth-child(3) > div > div.cell-7.cell-md > a' ).attr( 'href' );
    const price = $element.find( 'a > span.price-format > span.value' ).text().replace( /\s+/g, " " ).split( " " ).join( "" );

    const offer = {
      storeImage: `${constants.BASE_URL}${storeImage}`,
      title,
      rating,
      guarantee,
      price: parseInt( price, 10 ),
      storeUrl: `${constants.BASE_URL}${storeUrl}`,
    };

    data.list.push( offer );

  } );

  data.productImage = productImage;
  data.productTitle = productTitle;
  data.productDescription = productDescription;

  return data;

};

module.exports = { parseSearchResultsPage, parseOffersResultsPage };