const express = require('express');
const passport = require('passport');
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
// const allowRoles = require('../../../middleWares/checkRole');

// const {
//     passportConfigAdmin,
//     passportConfigLocalAdmin,
// } = require('../../../middleWares/passportAdmin');

// passport.use(passportConfigAdmin);
// passport.use(passportConfigLocalAdmin);

// router.route('/login') // Đối tượng cần kiểm tra là tài khoản và mật khẩu gửi lên
//     .post(validateSchema(loginSchema), login)

// router.route('/refresh-token')
//     .post(checkRefreshToken)

router.route('/profile') // Đối tượng cần kiểm tra là token có hợp lệ hay không
    .get(getMe)

router.route('/')
    .get(getAll)
    .post(validateSchema(createSchema), create)

router.route('/:id')
    .get(validateSchema(getDetailSchema), getDetail)
    .patch(validateSchema(editSchema), update)
    .delete(
        validateSchema(getDetailSchema), // CHECK PARAMS
        remove, // HANDLE DELETE
    )

module.exports = router;