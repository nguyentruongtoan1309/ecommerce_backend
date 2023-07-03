const { Schema } = require("mongoose");

const OrderDetailSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, require: true, min: 0 },
    price: { type: Number, required: true, min: 0, default: 0 },
    discount: { type: Number, default: 0 },
}, { versionKey: false },
);

module.exports = OrderDetailSchema;