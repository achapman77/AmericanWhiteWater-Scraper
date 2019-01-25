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
            .create({ text: req.body.text })
            .then(function (note) {
                return db.riverSection.findOneAndUpdate({ _id: req.body.riverSectionId }, { $set: { note: note._id } }) //Need another param here
            })
            .then(function (riverSection) {
                res.json(riverSection);
            });
    },
    update: function (req, res) {
        db.Note
            .findOneAndUpdate({ _id: req.params.id }, req.body)
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