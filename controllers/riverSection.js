// controllers/riverSection
//  These are the functions that interact with the db
// ====================================

const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
    // api/riverSections/clear
    clear: function (req, res) {
        db.RiverSection
            .deleteMany({})
            .then(function (riverSections) {
                return db.Note.deleteMany({})
            })
            .then(function () {
                res.send("All river sections and notes deleted");
                console.log("rivers and notes cleared")
            })
    },
    // api/riverSections/scrape
    scrape: function (req, res) {
        
        axios
            .get("https://www.americanwhitewater.org/content/River/state-summary/state/CO/")
            .then(function (response) {
                
                // Load the body of the HTML into cheerio
                const $ = cheerio.load(response.data);
  
                // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
                $("tr.river").each(function (i, element) {
            
                    const riverSection = {};

                    riverSection.riverName = $(element).find(".rivername").text().replace(/(\r\n\t|\n|\r\t)/gm, "");
                    riverSection.riverSection = $(element).find("span.river-section").text();
                    riverSection.riverSectionLink = $(element).find("span.river-section a").attr("href");
                    riverSection.sectionClass = $(element).find(".river_info").next("td").text();
                    riverSection.sectionCFS = $(element).find("td.gauge_info a").text();
                    riverSection.changeCFS = $(element).find("td.gauge_info span.river-trend").text().replace(/(\r\n\t|\n|\r\t)/gm, "");
                    riverSection.recommendation = $(element).find("td.rc:nth-child(5)").text().replace(/(\r\n\t|\n|\r\t)/gm, "").replace(/[^- ]*\-(\S*)/, "").trim();
                    riverSection.lastUpdated = $(element).find("td.gauge_info").next("td").next("td").text().replace(/(\r\n\t|\n|\r\t)/gm, "");
                    
                    // console.log(riverSection)

                    db.RiverSection
                        .create(riverSection)
                });
                
            })
            .then(function (riverSections) {
                res.json(riverSections);
                console.log("scrape complete")
            })
        
    },
    // api/riverSections/all
    findAll: function (req, res) {
        db.RiverSection
            .find().sort({ riverName: 1 }).sort({ riverSection: 1 })
            .then(function (riverSections) {
                res.json(riverSections);
            });
    },
    // api/riverSections/:id
    findOne: function(req, res) {
        db.RiverSection
            .findById(req.params.id)
            .populate("note")
            .then(function (riverSection) {
                res.json(riverSection);
            });
    },
    // api/riverSections/:id
    update: function(req, res) {
        console.log("req.body", req.body)
        db.RiverSection
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(function (riverSection) {
                res.json(riverSection)
            })
    },
    // api/riverSections/:id
    deleteOne: function(req, res) {
        db.RiverSection
            .deleteOne({
                _id: req.params.id
            })
            .then(function (riverSection) {
                res.json(riverSection)
            })
    }
}

// scrape!

