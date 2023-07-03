const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: [50, 'Tên sản phẩm không được vượt quá 50 ký tự'],
    },
    description: {
        type: String,
        maxLength: [500, 'Mô tả sản phẩm không được vượt quá 500 ký tự'],
    },
    price: { type: Number, required: [true, 'Giá không được để trống'], min: 0, default: 0 },
    supplierId: { type: Schema.Types.ObjectId, ref: 'supplier', required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'category', required: true },
    promotionPosition: [String],
    coverImageUrl: String,
    images: {
        _id: false,
        imageUrl: String,
        sortOrder: { type: Number, default: 1 }
    },
}, { timestamps: true });

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;