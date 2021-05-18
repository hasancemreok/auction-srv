const ObjectID = require('mongodb').ObjectID;
const Bid = require('./bid.model.js');

exports.findAll = (req, res) => {
  Bid.find()
  .then(items => res.send(items))
  .catch(error => res.status(500).send(error.message || "An error occurred"));
}

exports.findForItem = (req, res) => {
  Bid.find({'itemID': req.params.itemId })
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

exports.create = (req, res) => {
  console.log(req.body);

  const _bid = new Bid({
    userID: parseInt(req.body.userID),
    itemID: req.body.itemID,
    price: parseInt(req.body.price),
    bidTime: new Date(),
    isAutoBid: req.body.isAutoBid
  });

  _bid.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while inserting bid"
      });
  });
};