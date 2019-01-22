const Note = require("../models/Note");
const makeDate = require("../scripts/date");

module.exports = {
    get: (data, cb) => {
        Note.find({
            _riverSectionID: data._id
        }, cb);
    },
    save: (data, cb) => {
        
    }
}