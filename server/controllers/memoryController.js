const express = require("express");
var router = express.Router();
const path = require('path');
const mongoose = require("mongoose");
const Memory = mongoose.model("Memory");

router.post("/api", (req, res) => {
    if ((!req.query.id || req.query.id == '') 
        && (!req.body.id || req.body.id == '')) {
    insertRecord(req, res);
  } else {
    updateMemory(req, res);
  }
});

function insertRecord(req, res) {
    var memory = new Memory();
    memory.Title = req.body.Title;
    memory.Tags = req.body.Tags;
    memory.Date = req.body.Date;
    memory.Description = req.body.Description;
    memory.URL = req.body.URL;
    memory.Note = req.body.Note;
    memory.save()
        .then(function (memory) {
            console.log("Saved memory: " + memory.Title);
            res.send(memory);
            // Below is what I do for MMs after posting... not quite working here...
            //res.sendFile(path.join(__dirname, '../../client/public/'));
        });
}

// Get list of all memories
router.get("/list", (req, res) => {
    Memory.find()
        .then(function (memories) {
            console.log("All memories: " + memories);
            res.send(memories);
        })
        .catch(function (err) {
            console.log(err);
        });
}); 

// Get list of all memories with same title/tags
router.get("/api", (req, res) => {
    let title = req.query.Title;
    let tags = req.query.Tags;
    if (title) {
    Memory.find({Title: title})
        .then(function (memories) {
            console.log("All memories by title: " + memories);
            res.send(memories);
        })
        .catch(function (err) {
            console.log(err);
        });
    }
    else if (tags) {
        Memory.find({Tags: tags})
        .then(function (memories) {
            console.log("All memories by tags: " + memories);
            res.send(memories);
        })
        .catch(function (err) {
            console.log(err);
        });
    }
    else {
        console.log("No title/tag specified for given query...");
    }
}); 

// Save() will update the entire doc, whereas find/update features update
// specific fields. I think save makes more sense in our case.
function updateMemory(req, res) {
    let id = req.body.id;
    let title = req.body.Title;
    let tags = req.body.Tags;
    let date = req.body.Date;
    let description = req.body.Description;
    let url = req.body.URL;
    let note = req.body.Note;
    Memory.find({ _id: id })
        .then(function (memories) {
            if (memories.length == 1) {
                let memory = memories[0];
                memory.Title = title;
                memory.Tags = tags;
                memory.Date = date;
                memory.Description = description;
                memory.URL = url;
                memory.Note = note;
                memory.save()
                    .then(function (memories) {
                        console.log("Updated id = " + id + "; title = " + title);
                        res.send(memories);
                    })
            }
            else {
                res.send('More than one memory found. Update manually...');
            }
        })
        .catch(function (err) {
            console.log(err);
        });
};

router.delete("/api", (req, res) => {
    let id = req.query.id;
    let title = req.query.Title;
    Memory.findByIdAndRemove(id)
        .then(function (memories) {
            console.log("Deleted memory: " + title);
            res.send(memories);
            //res.send({ success: true, data: memories });
        })
});

module.exports = router;