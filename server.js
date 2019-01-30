//Video Walkthrough here: https://codingbootcamp.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=d7104bad-dfed-43bc-bb91-a9dd016a984d

//Require dependencies
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const logger = require("morgan");

//Set up port
const PORT = process.env.PORT || 3000;

// Instantiate our Express App
const app = express();

// Require our routes
const routes = require("./routes")


//Middleware==========================================
//Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Designate public folder as static directory
app.use(express.static("public"));

// Use morgan logger for logging requests
app.use(logger("dev"));

//Connect Handlebars to Express App
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars")

//Have every request go through our route middleware
app.use(routes);


// Database===========================================================
// USUALLY USE THIS METHOD TO CONNECT TO LOCAL DATABASE === BETTER ERRORS
//If deployed, use the deployed database.  Otherwise use the local mongo database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperStarter"

// DB Config
// const db = require('./config/keys').mongoURI;

// Connect to Mongo mLabs directly  (Avoid this in future)
// mongoose
//   .connect(db, {useNewUrlParser: true}) 
//   .then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err));

//Listen on the PORT
app.listen(PORT, function () {
    console.log(`Listening on port: ${PORT}`);
});
