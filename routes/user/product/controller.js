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

      const bestSeller = await Order.aggregate([
        {
          $match: {
            createdDate: { $gte: new Date(moment().subtract(30, "days").valueOf()) },
            status: { $ne: 'CANCELED' }
          }
        },
        { $unwind: { path: "$orderDetails" } },
        {
          $group: {
            _id: "$orderDetails.productId",
            sum: {
              $sum: "$orderDetails.quantity"
            }
          }
        },
        { $sort: { sum: -1 } },
      ]);

      const soldQuantityOfProduct = {};
      bestSeller.forEach(item => {
        soldQuantityOfProduct[item._id] = item.sum;
      });

      const bestSellerIds = Object.keys(soldQuantityOfProduct);

      let [results, count] = await Promise.all([
        Product.find({ _id: { $in: bestSellerIds } })
          .populate('categoryId')
          .populate('supplierId')
          .skip((perPage * page) - perPage)
          .limit(perPage)
          .lean(),
        Product.countDocuments({ _id: { $in: bestSellerIds } }),
      ]);

      const products = results.map(product => ({
        ...product,
        soldProduct: soldQuantityOfProduct[product._id.toString()]
      })).sort((pro1, pro2) => pro2.soldProduct - pro1.soldProduct);

      const payload = {
        products,
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
