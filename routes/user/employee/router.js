const express = require('express');
const router = express.Router();

const { validateSchema } = require('../../../utils');
const {
  loginSchema,
  getDetailSchema,
  createSchema,
  editSchema,
} = require('./validations');
const {
  login,
  checkRefreshToken,
  basic,
  getMe,
  getAll,
  getDetail,
  create,
  remove,
  update,
} = require('./controller');
// const allowRoles = require('../../../middle-wares/checkRole');

// router.route('/login')
//   .post(validateSchema(loginSchema), login)

// router.route('/refresh-token').post(checkRefreshToken)

router.route('/profile').get(getMe)

router.route('/')
  .get(getAll)
  .post(validateSchema(createSchema), create)

router.route('/:id')
  .get(validateSchema(getDetailSchema), getDetail)
  .patch(validateSchema(editSchema), update)
  .delete(
    validateSchema(getDetailSchema),
    remove,
  )

module.exports = router;
