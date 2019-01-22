//Server routs
//============


//Bring in Scrape function from scripts directory
const scrape = require("../scripts/scrape");

//Bring in riverSection and notes from the controller
const riverSectionsController = require("../controllers/riverSection");
const notesController = require("../controllers/note");

module.exports = router => {
    router.get('/', (req, res) => {
        res.render('home');
    });

    router.get('/saved', (req, res) => {
        res.render('saved');
    });

    router.get("/api/fetch", (req, res) => {
        riverSectionsController.fetch((err, docs) => {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "River Data Not Available Today"
                });
            } else {
                res.json({
                    message: `Added ${docs.insertedCount} Sections for Colorado Rivers`
                })
            }
        });
    });

    router.get("api/co-river-sections", (req, res) => {
        let query = {};
        if (req.query.saved) {
            query = req.query;
        }

        riverSectionsController.get(query, (data) => {
            res.json(data);
        });
    });

    router.delete("/api/co-river-sections/:id", (req, res) => {
        let query = {};
        query._id = req.params.id;
        riverSectionsController.delete(query, (err, data) => {
            res.json(data);
        });
    });

    router.patch("/api/co-river-sections", (req, res) => {
        riverSectionsController.update(req.body, (err, data) => {
            res.json(data);
        });
    });

    //Grabs all notes associated with river section @26min in https://www.youtube.com/watch?v=17-n9ImiWVc
    router.get("/api/notes/:riverSection_id?", (req, res) => {
        let query = {};
        if (req.params.riverSection_id) {
            query._id = req.params.riverSection_id;
        }

        notesController.get(query, (err, data) => {
            res.json(data);
        });
    });

    //Route to Delete notes @27min
    router.delete("/api/notes/:id", (req, res) => {
        let query = {};
        query._id = req.params.id;
        
        notesController.delete(query, (err, data) => {
            res.json(data);
        });
    });

    //Route to post new notes to river sections @28min
    router.post("/api/notes", (req, res) => {
        notesController.save(req.body, (data) => {
            res.json(data)
        });
    });
}