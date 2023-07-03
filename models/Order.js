const mongoose = require("mongoose");
const OrderDetailSchema = require("./OrderDetail");

const OrderSchema = new mongoose.Schema({
    createdDate: {
        type: Date,
        required: true,
        default: Date.now,
    },

    shippedDate: {
        type: Date,
        validate: {
            validator: function (value) {
                if (!value) return true;

                if (value < this.createdDate) {
                    return false;
                }

                return true;
            },
            message: `Shipped date: {VALUE} is invalid!`,
        },
    },
    status: { type: String, enum: ['WAITING', 'COMPLETED', 'CANCELED'], default: 'WAITING' },
    description: String,
    shippingAddress: String,
    paymentType: { type: String, enum: ['CASH', 'CREDIT CARD'], default: 'CASH' },
    customerId: { type: mongoose.Types.ObjectId, ref: 'customer' },
    employeeId: { type: mongoose.Types.ObjectId, ref: 'employee' },
    orderDetails: [OrderDetailSchema],
    contactInformation: { _id: false },
    shippingInformation: { _id: false },
    paymentInformation: { _id: false },
}, { timestamps: true });

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;