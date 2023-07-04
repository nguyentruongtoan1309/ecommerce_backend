
const { Category } = require('../../../models');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      let perPage = 20;
      let page = parseInt(req.params.page || 1, 10);

      let [results, count] = await Promise.all([
        Category.find().skip((perPage * page) - perPage).limit(perPage),
        Category.countDocuments(),
      ]);

      const payload = {
        categories: results,
        currentPage: page,
        pages: Math.ceil(count / perPage),
      }

      return res.send({ code: 200, payload });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  getDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      let found = await Category.findById(id)

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
