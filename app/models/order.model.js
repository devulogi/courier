const mongoose = require('mongoose');
const moment = require('moment-timezone');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  pickupAddress: String,
  deliveryAddress: String,
  specialInstructions: String,
  paymentDetails: String,
  deliveryType: {
    type: String,
    enum: ['express', 'same-day', 'next-day'],
  },
  orderStatus: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'DeliveryStatus' 
  },
  createdAt: moment.tz('Asia/Manila').toDate(),
  updatedAt: moment.tz('Asia/Manila').toDate(),
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
