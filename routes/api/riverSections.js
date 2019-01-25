const router = require("express").Router();
const riverSectionController = require("../../controllers/riverSection");

//  /api/riverSections/clear
router.get("/clear", riverSectionController.clear);

// /api/riverSections/scrape
router.get("/scrape", riverSectionController.scrape);

// /api/riverSections/all
router.get("/all", riverSectionController.findAll);

// /api/riverSections/:id
router.get("/:id", riverSectionController.findOne);
router.put("/:id", riverSectionController.update);
router.delete("/:id", riverSectionController.deleteOne);

module.exports = router;