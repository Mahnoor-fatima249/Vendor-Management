const express = require('express');
const router = express.Router();
const { getVendors, createVendor, updateVendor, deleteVendor } = require('../controllers/vendorController');

router.route('/').get(getVendors).post(createVendor);
router.route('/:id').put(updateVendor).delete(deleteVendor);

module.exports = router;