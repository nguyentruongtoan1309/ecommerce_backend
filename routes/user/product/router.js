const express = require('express');
const router = express.Router();

const { validateSchema } = require('../../../utils');
const { getProductSchema } = require('./validations');
const {
  getProductAll,
  getHotSell,
  getProductDetail,
} = require('./controller');

router.route('/').get(getProductAll)
router.route('/hotsell').get(getHotSell)
router.route('/:id').get(validateSchema(getProductSchema), getProductDetail)

module.exports = router;
