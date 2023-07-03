const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên danh mục không được bỏ trống'],
        maxLength: [50, 'Tên danh mục không được vượt quá 50 ký tự'],
        unique: [true, 'Tên danh mục không được trùng'],
    },
    description: {
        type: String,
        maxLength: [500, 'Mô tả không được vượt quá 500 ký tự'],
    },
    promotionPosition: [String],
    coverImageUrl: String,
    sortOrder: { type: Number, enum: [1, -1], default: 1 },
    active: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdBy: mongoose.Types.ObjectId,
    updatedBy: mongoose.Types.ObjectId
}, { timestamps: true });

const Category = mongoose.model("category", CategorySchema);

module.exports = Category;