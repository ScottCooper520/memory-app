const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Memory = mongoose.model("Memory");

router.post("/api", (req, res) => {
  if (!req.body._id || req.body._id == '') {
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }
});

function insertRecord(req, res) {
  var memory = new Memory();
  memory.Title = req.body.Title;
  memory.Tags = req.body.Tags;
  memory.Date = req.body.Date;
  memory.Descrtiption = req.body.Descrtiption;
  memory.URL = req.body.URL;
  memory.Note = req.body.Note;
  memory.save()
  .then(function() {
    console.log("Saved memory: " + memory.Title);
    res.redirect("list");
  });
}

function updateRecord(req, res) {
  Memory.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("memory/list");
      } else {
        console.log("Error during update: " + err);
      }
    }
  );
}

// Get list of all memories
router.get("/list", (req, res) => {
    Memory.find()
        .then(function (memories) {
            console.log("All memories: " + memories);
            //OK as long as there are at least 3 memories
            // console.log("First memory _id: " + memories[0]._id);
            // console.log("Second memory _id: " + memories[1]._id);
            // console.log("Third memory _id: " + memories[2]._id);
            res.send(memories);
        })
        .catch(function (err) {
            console.log(err);
        });
}); 

// Get list of all memories with same title
router.get("/api", (req, res) => {
    let title = req.query.Title;
    Memory.findOne({Title: title})
        .then(function (memories) {
            console.log("All memories: " + memories);
            res.send(memories);
        })
        .catch(function (err) {
            console.log(err);
        });
}); 

router.delete("/api", (req, res) => {
    let id = req.query.id;
    let title = req.query.Title;
    Memory.findByIdAndRemove(id)
    .then(function() {
        console.log("Deleted memory: " + title);
        res.redirect("list");
    })
});

module.exports = router;