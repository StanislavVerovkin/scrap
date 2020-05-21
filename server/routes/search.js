const express = require( 'express' );
const router = express.Router();

const productsController = require( '../controllers/products' );

router.get( '/:query&page=:page', productsController.getProductsBySearch );

module.exports = router;
