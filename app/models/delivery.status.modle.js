const mongoose = require('mongoose');
const moment = require('moment-timezone');

const deliveryStatusSchema = new mongoose.Schema({
  orderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order' 
  },
  status: {
    type: String,
    enum: ['pending-pickup', 'pending-delivery', 'picked-up', 'in-transit', 'delivered', 'cancelled'],
    /**
     * Order status:
     * pending-pickup: The order has been created but not yet picked up by a courier.
     * pending-delivery: The order has been picked up by a courier and is waiting for the customer to pay.
     * picked-up: The order has been picked up by a courier and the customer has paid.
     * in-transit: The order has been picked up by a courier and is in transit to the delivery address.
     * delivered: The order has been delivered to the delivery address.
     * cancelled: The order has been cancelled by the customer.
     */
    default: 'pending-pickup',
  },
  createdAt: moment.tz('Asia/Manila').toDate(),
  updatedAt: moment.tz('Asia/Manila').toDate(),
});

const DeliveryStatus = mongoose.model('DeliveryStatus', deliveryStatusSchema);

module.exports = DeliveryStatus;
