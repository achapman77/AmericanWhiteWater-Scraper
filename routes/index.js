var router = require("express").Router();
var apiRoutes = require("./api"); //look for index.js in that folder
var viewRoutes = require("./view"); //look for index.js in that folder

router.use("/api", apiRoutes); 
router.use("/", viewRoutes);

module.exports = router;