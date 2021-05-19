const mongoose = require('mongoose');

const BidSchema = mongoose.Schema({
  userID: Number,
  itemID: String,
  price: Number,
  bidTime: Date,
  isAutoBid: Boolean,
  item: {type: mongoose.Schema.Types.ObjectId, ref: "Item"}
}, { timestamps: true });

module.exports = mongoose.model('Bid', BidSchema);