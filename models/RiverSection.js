const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const riverSectionSchema = new Schema({
    riverName: {
        type: String,
        required: true
    },
    riverSection: {
        type: String,
        required: true
    },
    riverSectionLink: {
        type: String
    },
    sectionClass: {
        type: String,
        required: true
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
    }
});

const RiverSection = mongoose.model("RiverSection", riverSectionSchema);

module.exports = RiverSection;