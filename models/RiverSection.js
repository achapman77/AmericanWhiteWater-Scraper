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
    },
    notes: [
        {
          // Store ObjectIds in the array
          type: Schema.Types.ObjectId,
          // The ObjectIds will refer to the ids in the Note model
          ref: "Note"
        }
      ]
});

const RiverSection = mongoose.model("RiverSection", riverSectionSchema);

module.exports = RiverSection;