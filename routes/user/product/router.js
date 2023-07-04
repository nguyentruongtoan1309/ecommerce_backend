const express = require('express');
const router = express.Router();

const { validateSchema } = require('../../../utils');
const { getProductSchema } = require('./validations');
const {
  getProductAll,
  getHotSell,
  getFlashSell,
  getProductDetail,
} = require('./controller');

router.route('/hotSell').get(getHotSell)
router.route('/flashSell').get(getFlashSell)

router.route('/hotSell/:page').get(getHotSell)
router.route('/flashSell/:page').get(getFlashSell)

router.route('/').get(getProductAll)
router.route('/:page').get(getProductAll)
router.route('/:id').get(validateSchema(getProductSchema), getProductDetail)

module.exports = router;
