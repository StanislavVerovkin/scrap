const express = require( 'express' );
const router = express.Router();

const offersController = require( '../controllers/offers' );

router.get( '/:category/:product/prices', offersController.getProductByOffers );
router.get( '/:category/:product/prices/:order', offersController.sortProductByOffers );

module.exports = router;
