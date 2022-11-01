const express = require('express');
const router = express.Router();

const {
    createProduct,
    getAllProducts,
} = require('../controllers/productController');
const { uploadProductImage, uploadProductImageCloudinary } = require('../controllers/uploadsController');

router.route('/').post(createProduct).get(getAllProducts);
router.route('/uploads').post(uploadProductImageCloudinary);

module.exports = router;