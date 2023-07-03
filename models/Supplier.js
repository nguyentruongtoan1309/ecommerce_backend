const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên không được bỏ trống'],
        maxLength: [100, 'Tên nhà cung cấp không được vượt quá 100 ký tự'],
    },
    email: {
        type: String,
        validate: {
            validator: function (value) {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(value);
            },
            message: `{VALUE} không phải là email hợp lệ!`,
        },
        required: [true, 'Email không được bỏ trống'],
        unique: [true, 'Email không được trùng'],
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: function (value) {
                const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
                return phoneRegex.test(value);
            },
            message: `{VALUE} không phải là số điện thoại hợp lệ!`,
        },
        unique: [true, 'Số điện thoại không được trùng'],
    },
    address: {
        type: String,
        maxLength: [500, 'Địa chỉ không được vượt quá 500 ký tự'],
    },
}, { timestamps: true });

const Supplier = mongoose.model("supplier", SupplierSchema);

module.exports = Supplier;