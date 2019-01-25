const router = require("express").Router();
const noteRoutes = require("./notes");
const riverSectionRoutes = require("./riverSections");

// riverSectionRoutes ==>  /api/riverSections/???
router.use("/riverSections", riverSectionRoutes);

// noteRoutes ==> /api/notes/???
router.use("/notes", noteRoutes);

module.exports = router;