var express = require('express');
const router = express.Router();

const categoriesRouter = require('./category/router');
const customersRouter = require('./customer/router');
const employeesRouter = require('./employee/router');
const ordersRouter = require('./order/router');
const productsRouter = require('./product/router');

router.use('/employees', employeesRouter);
router.use('/categories', categoriesRouter);
router.use('/customers', customersRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);

module.exports = router;
