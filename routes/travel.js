const path = require('path');
const express = require('express');
const travelRoute = require('../controllers/travel')
const dec = require('../controllers/decorator')
const router = express.Router();

router.get('/',travelRoute.getHome);

router.get('/book-cab',dec,travelRoute.getType);

router.get('/book-train',dec,travelRoute.getTrain);

router.get('/book-plane',dec,travelRoute.getPlane);

router.get('/plane-bookings/:id',dec,travelRoute.getBookPlane);

router.post('/plane-bookings',dec,travelRoute.postBookPlane);

router.get('/train-bookings/:id',dec,travelRoute.getBookTrain);

router.post('/train-bookings',dec,travelRoute.postBookTrain);

router.get('/plane-payments',dec,travelRoute.getPlanePayments);

router.get('/train-payments',dec,travelRoute.getTrainPayments);

router.get('/cab-bookings/:id', dec, travelRoute.getCabBookings);

router.post('/cab-bookings', dec, travelRoute.postBookCab);

router.get('/cab-payments', dec, travelRoute.getCabPayments);

router.post('/cab-checkout',dec, travelRoute.postCabPayments);

router.post('/plane-checkout', dec, travelRoute.postPlanePayments);

router.post('/train-checkout', dec, travelRoute.postTrainPayments);

router.get('/confirmation', dec, travelRoute.getConfirmation);

router.get('/feedback', dec, travelRoute.getFeedback);

router.post('/feedback', dec, travelRoute.postFeedback);

module.exports = router;
