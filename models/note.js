const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    // _riverSectionID: {
    //     type: Schema.Types.ObjectId,
    //     ref: "RiverSection"
    // },
    body: String
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;

// random comment