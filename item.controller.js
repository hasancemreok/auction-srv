const Item = require('./item.model.js');

exports.findAll = (req, res) => {
  const query = req.body;
  const orderType = query.sortType == '0' ? 'asc' : 'desc';

  let order = {};
  if(query.sortBy == '0')
    order = { '_id' : orderType }
  else if(query.sortBy == '1')
    order = { 'lastBid' : orderType }
  else if(query.sortBy == '2')
    order = { 'startPrice': orderType }
  else order = {}

  Item.find({
    $or: [
      { caption: { '$regex': query.search }},
      { description: { '$regex': query.search }}
    ]})
  .sort(order)
  .then(items => res.send(items))
  .catch(error => res.status(500).send(error.message || "An error occurred"));
}

exports.findOne = (req, res) => {
  Item.findById(req.params.itemId)
  .populate("item")
  .then(item => {
    if(!item) return res.status(404).send({message: "Item not found with id " + req.params.itemId});
    res.send(item);
  })
}