const ObjectID = require('mongodb').ObjectID;
const Bid = require('./bid.model.js');
const Item = require('./item.model.js');

exports.findAll = (req, res) => {
  Bid.find()
  .then(items => res.send(items))
  .catch(error => res.status(500).send(error.message || "An error occurred"));
}

exports.findForItem = (req, res) => {
  Bid.find({'itemID': req.params.itemId })
  .sort({'_id': 'desc'})
  .then(item => {
    if(!item) return res.status(404).send({message: "Item not found with id " + req.params.itemId});
    res.send(item);
  })
}

exports.findForUser = (req, res) => {
  Bid.find({'userID': req.params.userId})
  .then(item => {
    if(!item) return res.status(404).send({message: "Item not found with id " + req.params.itemId});
    res.send(item);
  })
}

exports.create = async (req, res) => {
  const msg1 = await Bid.findOne({
    $and: [
      {'price': { $gte: req.body.price }},
      {'itemID': req.body.itemID}
    ]
  })
  .then(bid => {
    if(bid) return {message: "Bid not approved. Your price cannot be equal or lower than last bid"};
  });

  if(msg1) {
    res.status(400).send(msg1.message);
    return;
  }

  const msg2 = await Bid.find()
  .sort({'_id': -1})
  .limit(1)
  .then(bid => {
    if(bid && bid.userID == req.body.userID)
      return {message: "Bid not approved. Last bid is yours."}
  });

  if(msg2) {
    res.status(400).send(msg2.message);
    return;
  }

  const msg3 = await Item.findById(req.body.itemID)
  .then(item => {
    if(item && item.lastBid >= req.body.price)
      return {message: "Bid not approved. Item's current price equal or greather than from your bid."}
  });

  if(msg3) {
    res.status(400).send(msg.message);
    return;
  }

  Item.findByIdAndUpdate(req.body.itemID, { lastBid: req.body.price})
  .then((item) => { 

    const _bid = new Bid({
      userID: parseInt(req.body.userID),
      itemID: item._id,
      price: parseInt(req.body.price),
      bidTime: new Date(),
      isAutoBid: req.body.isAutoBid,
      item: item._id,
    });  

    _bid.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while inserting bid"
      });
    });  
  })
  .catch(err => {
    console.log(err);
  })
};