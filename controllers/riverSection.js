const scrape = require("../scripts/scrape");
const makeDate = require("../scripts/date");

const RiverSection = require("../models/RiverSection");


module.exports = {
    fetch: (cb) => {
        scrape((data) => {
            const rivers = data;
            for (let i = 0; i < rivers.length; i++) {
                rivers[i].date = makeDate();
                rivers[i].saved = false;
            }

            RiverSection.collection.insertMany(rivers, { ordered: false }, (err, docs) => {
                cb(err, docs);
            });
        });
    },
    delete: (query, cb) => {
        RiverSection.remove(query, cb);
    },
    get: (query, cb) => {
        RiverSection.find(query)
            .sort({
                _id: -1
            })
            .exec((err, doc) => {
                cb(doc)
            });
    },
    update: (query, cb) => {
        RiverSection.update({ _id: query._id }, {
            $set: query
        }, {}, cb);
    }
}