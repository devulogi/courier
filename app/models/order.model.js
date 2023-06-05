const mongoose = require('mongoose');

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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
