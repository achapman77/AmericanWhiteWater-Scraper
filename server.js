//Video Walkthrough here: https://www.youtube.com/watch?v=17-n9ImiWVc

//Require dependencies
const express = require('express');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');

//Set up port
const PORT = process.env.PORT || 3000;

const app = express();

//Setup express router
const router = express.Router();

//Require routes file and pass Router object
require('./config/routes')(router);

//Designate public folder as static directory
app.use(express.static(__dirname + '/public'));

//Connect Handlebars to Express App
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars')

//Use bodyParser
app.use(bodyParser.urlencoded({
  extended: false
}));

//Have every request go through our router middleware
app.use(router);

//If deployed, use the deployed database.  Otherwis use the local mongo database
// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(db, {useNewUrlParser: true}) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//Listen on the PORT
app.listen(PORT, function () {
    console.log(`Listening on port: ${PORT}`);
});
