const { Product, Category, Supplier, Order } = require('../../../models');
const moment = require('moment');

module.exports = {
  getProductAll: async (req, res, next) => {
    try {
      let perPage = 30;
      let page = parseInt(req.params.page || 1, 10);

      let [results, count] = await Promise.all([
        Product.find()
          .populate('categoryId')
          .populate('supplierId')
          .skip((perPage * page) - perPage)
          .limit(perPage),
        Product.countDocuments(),
      ]);

      const payload = {
        products: results,
        currentPage: page,
        pages: Math.ceil(count / perPage),
      }

      return res.send({ code: 200, payload });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  getHotSell: async (req, res, next) => {
    try {
      let perPage = 10;
      let page = parseInt(req.params.page || 1, 10);

      const orders = await Order.find({ createdDate: { $gte: moment().subtract(30, "days") } }).lean();
      const bestSellerIds = [...new Set(orders.map(order => order.orderDetails || [])
        .flat()
        .sort((order1, order2) => order1.quantity - order2.quantity)
        .map(order => order.productId))];

      let [results, count] = await Promise.all([
        Product.find({ _id: { $in: bestSellerIds } })
          .populate('categoryId')
          .populate('supplierId')
          .skip((perPage * page) - perPage)
          .limit(perPage),
        Product.countDocuments({ _id: { $in: bestSellerIds } }),
      ]);

      const payload = {
        products: results,
        currentPage: page,
        pages: Math.ceil(count / perPage),
      }

      return res.send({ code: 200, payload });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  getFlashSell: async (req, res, next) => {
    try {
      let perPage = 10;
      let page = parseInt(req.params.page || 1, 10);

      const [flashSellProducts, count] = await Promise.all([
        Product.find()
          .populate('categoryId')
          .populate('supplierId')
          .sort({ discount: -1 })
          .skip((perPage * page) - perPage)
          .limit(perPage),
        Product.countDocuments(),
      ]);

      const payload = {
        products: flashSellProducts,
        currentPage: page,
        pages: Math.ceil(count / perPage),
      }

      return res.send({ code: 200, payload });
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
