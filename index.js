const express = require("express");
const app = express();
const router = require("express").Router();
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const mongo = require("./mongo/index");
var dbdetails = mongo.dbdetails;

app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

const URL =
  "mongodb+srv://" +
  dbdetails.username +
  ":" +
  dbdetails.password +
  "@" +
  dbdetails.host +
  "/" +
  dbdetails.database +
  "?retryWrites=true&w=majority";
// const URL = 'mongodb://127.0.0.1:27017/rickymorty'; //local
console.log(URL);

mongoose.connect(URL, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err);
    console.log("Error while Connecting!");
  } else {
    console.log("Connected to Mongo DB");
  }
});

const CartoonRoute = require('./routes/CartoonRoute');
app.use('/cartoons', CartoonRoute);

const UserRoute = require('./routes/UserRoute');
app.use('/users', UserRoute);

app.get('/',function(req,res){
  res.send("Rick Morty API Services")
})

app.listen(PORT, () => {
    console.log('Server Started on PORT ' + PORT)
})
