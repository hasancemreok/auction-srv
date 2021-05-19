const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
const port = 3001 || process.env.PORT;

// db
const dbUrl = "mongodb://localhost:27017/auctionapp";

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, { useNewUrlParser: true})
.then(() => console.log('db connection successful'))
.catch(err => {
  console.log('cannot connect to db.', err)
  process.exit();
})

// routes for items
const items = require('./item.controller.js');
app.post('/items', items.findAll);
app.post('/items/:itemId', items.findOne);

// routes for items
const bids = require('./bid.controller.js');
app.post('/items/:itemId/bids', bids.findForItem);
app.post('/users/:userId/bids', bids.findForUser);
app.post('/bids', bids.create);

app.listen(port, () => {
  console.log('rest server running...');
});