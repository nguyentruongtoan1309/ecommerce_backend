const { Product, Category, Supplier, Order } = require('../../../models');
const moment = require('moment');

module.exports = {
  getProductAll: async (req, res, next) => {
    try {
      let results = await Product.find()
        .populate('categoryId')
        .populate('supplierId');

      return res.send({ code: 200, payload: results });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  getHotSell: async (req, res, next) => {
    try {
      const orders = await Order.find({ createdDate: { $gte: moment().subtract(30, "days") } }).lean();
      const bestSellerIds = [...new Set(orders.map(order => order.orderDetails || [])
        .flat()
        .sort((order1, order2) => order1.quantity - order2.quantity)
        .map(order => order.productId))];

      let results = await Product.find({ _id: { $in: bestSellerIds } })
        .populate('categoryId')
        .populate('supplierId');

      return res.send({ code: 200, payload: results });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  getProductDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      let found = await Product.findById(id)
        .populate('categoryId')
        .populate('supplierId');

      if (found) {
        return res.send({ code: 200, payload: found });
      }

      return res.status(410).send({ code: 404, message: 'Không tìm thấy' });
    } catch (err) {
      res.status(404).json({
        message: 'Get detail fail!!',
        payload: err,
      });
    }
  },
};
