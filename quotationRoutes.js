const express = require('express');
const router = express.Router();
const { createQuotation, getQuotations, updateQuotationStatus } = require('../controllers/quotationController');

router.route('/').get(getQuotations).post(createQuotation);
router.route('/:id/status').patch(updateQuotationStatus);

module.exports = router;