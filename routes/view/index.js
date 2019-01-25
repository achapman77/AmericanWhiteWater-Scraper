//routes/view/index.js
//

const router = require("express").Router();
const db = require("../../models");


router.get("/", function (req, res) {
    db.RiverSection
        .find({ saved: false })
        .then(function (riverSections) {
            res.render("riverSections", { riverSections });
        });
});

router.get("/saved", function (req, res) {
    db.RiverSection
        .find({ saved: true })
        .populate("note")
        .then(function (riverSections) {
            res.render("saved", { riverSections });
        });
});

module.exports = router;