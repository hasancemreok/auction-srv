const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
  caption: String,
  description: String,
  auctionEndDate: Date,
  lastBid: Number,
  startPrice: Number,
  pricePerBid: Number,
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);