const mongoose = require('mongoose');
const moment = require('moment-timezone');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  phone: String,
  role: {
    type: String,
    enum: ['customer', 'courier', 'staff', 'admin'],
    default: 'customer',
    /**
     * Role:
     * customer: A customer who can place orders.
     * staff: A staff member who can deliver orders.
     * admin: An admin who can manage users and orders.
     */
  },
  createdAt: {
    type: Date,
    default: moment.tz('Asia/Manila').toDate(),
  },
  updatedAt: {
    type: Date,
    default: moment.tz('Asia/Manila').toDate(),
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
