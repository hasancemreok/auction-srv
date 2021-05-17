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

// routes
const items = require('./item.controller.js');
app.get('/items', items.findAll);
app.get('/items/:itemId', items.findOne);

app.listen(port, () => {
  console.log('rest server running...');
});