const path = require('path');
const express = require('express');
const adminRoutes = require('../controllers/admin')
const dec = require('../controllers/decorator')
const router = express.Router();

router.get('/',dec,adminRoutes.getAdmin);

router.get('/type',dec,adminRoutes.getCab);

router.get('/plane',dec,adminRoutes.getPlane);

router.get('/train',dec,adminRoutes.getTrain);

router.get('/add-type',dec,adminRoutes.getAddType);

router.post('/add-type',dec,adminRoutes.postAddType);

router.get('/add-train',dec,adminRoutes.getAddTrain);

router.post('/add-train',dec,adminRoutes.postAddTrain);

router.get('/add-plane',dec,adminRoutes.getAddPlane);

router.post('/add-plane',dec,adminRoutes.postAddPlane);

router.get('/edit-plane/:id',dec,adminRoutes.getEditPlane);

router.post('/edit-plane',dec,adminRoutes.postEditPlane);

router.get('/edit-train/:id',dec,adminRoutes.getEditTrain);

router.post('/edit-train',dec,adminRoutes.postEditTrain);

router.get('/edit-type/:id',dec,adminRoutes.getEditType);

router.post('/edit-type',dec,adminRoutes.postEditType);

router.post('/delete-plane',dec,adminRoutes.postDeletePlane);

router.post('/delete-train',dec,adminRoutes.postDeleteTrain);

router.post('/delete-type',dec,adminRoutes.postDeleteType);
module.exports=router;
