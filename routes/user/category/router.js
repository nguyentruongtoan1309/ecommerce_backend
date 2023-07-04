const express = require('express');
const router = express.Router();

const { validateSchema } = require('../../../utils');
const {
  getDetailSchema,
  createSchema,
} = require('./validations');
const {
  getAll,
  getDetail,
} = require('./controller');

router.route('/').get(getAll)
router.route('/:page').get(getAll)
router.route('/:id').get(validateSchema(getDetailSchema), getDetail)

module.exports = router;
