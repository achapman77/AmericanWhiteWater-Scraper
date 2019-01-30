var db = require('../models');

module.exports = {
    findAll: function (req, res) {
        db.Note
            .find()
            .then(function (notes) {
                res.json(notes);
            });
    },
    findOne: function (req, res) {
        db.Note
            .findById(req.params.id)
            .then(function (note) {
                res.json(note);
            });
    },
    create: function (req, res) {
        db.Note
            .create({ body: req.body.text })
            .then(function (note) {
                return db.RiverSection.findOneAndUpdate({ _id: req.body.riverSectionID }, { $set: { notes: note._id } }, { new: true }, (err, doc) => {
                    if (err) {
                        console.log("Something went wrong attaching note to riverSection")
                    }
                    console.log("Note Create: ", doc)
                }) 
            })
            .then(function (riverSection) {
                res.json(riverSection);
            });
    },
    update: function (req, res) {
        db.Note
            .findOneAndUpdate({ _id: req.params.id }, { $set: { body: req.body.text } }, { upsert: true }, (err, doc) => {
                if (err) {
                    console.log("Something went wrong updating note")
                }
                console.log("Note Update: ", doc)
            })
            .then(function (riverSection) {
                res.json(riverSection);
            });
    },
    delete: function (req, res) {
        db.Note
            .deleteOne({ _id: req.params.id })
            .then(function (riverSection) {
                res.json(riverSection);
            });
    }

};

 // Create a new note
//   create: function(req, res) {
//     db.Note.create(req.body).then(function(dbNote) {
//       res.json(dbNote);
//     });
//   },