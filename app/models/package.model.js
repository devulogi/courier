const mongoose = require('mongoose');
const moment = require('moment-timezone');

const packageSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  weight: Number,
  dimensions: String,
  contents: String,
  createdAt: {
    type: Date,
    default: moment.tz('Asia/Manila').toDate(),
  },
  updatedAt: {
    type: Date,
    default: moment.tz('Asia/Manila').toDate(),
  }
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
