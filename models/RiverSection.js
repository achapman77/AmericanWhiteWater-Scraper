const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const riverSectionSchema = new Schema({
    riverName: {
        type: String
    },
    riverSection: {
        type: String
    },
    riverSectionLink: {
        type: String
    },
    sectionClass: {
        type: String
    },
    sectionCFS: {
        type: String
    },
    changeCFS: {
        type: String
    },
    recommendation: {
        type: String
    },
    lastUpdated: {
        type: String
    },
    saved: {
        type: Boolean,
        default: false
    }
});

const RiverSection = mongoose.model("RiverSection", riverSectionSchema);

module.exports = RiverSection;