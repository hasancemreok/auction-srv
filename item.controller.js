const Item = require('./item.model.js');

exports.findAll = (req, res) => {
  Item.find()
  .then(items => res.send(items))
  .catch(error => res.status(500).send(error.message || "An error occurred"));
}

exports.findOne = (req, res) => {
  Item.findById(req.params.itemId)
  .then(item => {
    if(!item) return res.status(404).send({message: "Item not found with id " + req.params.itemId});
    res.send(item);
  })
}