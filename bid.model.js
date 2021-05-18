const mongoose = require('mongoose');

const BidSchema = mongoose.Schema({
  userID: Number,
  itemID: String,
  price: Number,
  bidTime: Date,
  isAutoBid: Boolean,
}, { timestamps: true });

module.exports = mongoose.model('Bid', BidSchema);