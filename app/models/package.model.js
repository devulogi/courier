const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  weight: Number,
  dimensions: String,
  contents: String,
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
