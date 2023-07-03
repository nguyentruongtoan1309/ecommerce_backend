const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Tên không được bỏ trống'],
        maxLength: [50, 'Tên không được vượt quá 50 ký tự'],
    },
    lastName: {
        type: String,
        required: [true, 'Họ không được bỏ trống'],
        maxLength: [50, 'Họ không được vượt quá 50 ký tự'],
    },
    phoneNumber: {
        type: String,
        maxLength: [50, 'Số điện thoại không được vượt quá 50 ký tự'],
        validate: {
            validator: function (value) {
                const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
                return phoneRegex.test(value);
            },
            message: `{VALUE} is not a valid phone!`,
        },
    },
    address: {
        type: String,
        required: [true, 'Địa chỉ không được bỏ trống'],
        maxLength: [500, 'Địa chỉ không được vượt quá 500 ký tự'],
        unique: [true, 'Địa chỉ không được trùng'],
    },
    email: {
        type: String,
        validate: {
            validator: function (value) {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(value);
            },
            message: `{VALUE} is not a valid email!`,
        },
        required: [true, 'Email không được bỏ trống'],
        maxLength: [50, 'Email không được vượt quá 50 ký tự'],
        unique: [true, 'Email không được trùng'],
    },
    birthday: Date,
    password: {
        type: String,
        minLength: [6, 'Mật khẩu phải có tối thiểu 6 kí tự'],
        maxLength: [12, 'Mật khẩu không được vượt quá 12 ký tự'],
        required: [true, 'Mật khẩu không được bỏ trống'],
    },
    lastActivity: Date,
    locked: { type: Boolean, default: false },
    roles: {
        type: Array,
        default: [],
    },
}, { timestamps: true });

const Customer = mongoose.model("customer", CustomerSchema);

module.exports = Customer;