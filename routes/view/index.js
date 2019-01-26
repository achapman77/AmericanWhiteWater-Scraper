//routes/view/index.js
//

const router = require("express").Router();
const db = require("../../models");


router.get("/", function (req, res) {
    db.RiverSection
        .find().sort({ riverName: 1 }).sort({ riverSection: 1 })
        .then(function (riverSections) {
            // console.log(riverSections)
            res.render("home", { riverSections });
        });
});

router.get("/saved", function (req, res) {
    db.RiverSection
        .find({ saved: true })
        .populate("note")
        .then(function (riverSections, notes) {
            res.render("saved", { riverSections, notes });
        });
});

module.exports = router;