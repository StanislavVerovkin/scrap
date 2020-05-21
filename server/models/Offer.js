const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const offerSchema = new Schema( {
  list: [
    {
      image: { type: String, },
      title: { type: String },
      rating: { type: String },
      guarantee: { type: String },
      price: { type: Number },
      storeUrl: { type: String },
    }
  ],
  id: { type: String },
  dateCreated: { type: String },
  productImage: { type: String },
} );

module.exports = mongoose.model( 'offers', offerSchema );