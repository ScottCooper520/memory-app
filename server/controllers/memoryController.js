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
    //updateRecord(req, res);
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

// function updateRecord(req, res) {
//   Memory.findOneAndUpdate(
//     { _id: req.body._id },
//     req.body,
//     { new: true },
//     (err, doc) => {
//       if (!err) {
//         res.redirect("memory/list");
//       } else {
//         console.log("Error during update: " + err);
//       }
//     }
//   );
// }

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
// // See a problem with this approach for update: I use the client fields to 
// // get strings with which to get the id. However, for an update, those very
// // strings have likely changed, so no id will be found.
// // BTW - save will update the entire doc, whereas find/update features update
// // specific fields. I think save makes more sense in our case.
// // Get id via title, tags, descriptions (to ensure it is unique)
// // If more than one memory is returned, do not delete. Should investigate.
// function updateMemory(req, res)  {
//     let title = req.query.Title;
//     let tags = req.query.Tags;
//     let desc = req.query.Description;
//     Memory.find({ Title: title, Tags: tags, Description: desc })
//         .then(function (memories) {
//             if (memories.length == 1) {
//                 let id = memories[0]._id;
//                 console.log("id from title: " + title + " = " + id);
//                 Memory.findById(id)
//                     .then(function (memory) {

//                         console.log("Updated memory: " + title);
//                         res.send(memory);
//                         //res.send({ success: true, data: memories });
//                     })
//             }
//             else {
//                 res.send('More than one memory found. Delete manually...');
//             }
//         })
//         .catch(function (err) {
//             console.log(err);
//         });
// };

// // Get id via title, tags, descriptions (to ensure it is unique)
// // If more than one memory is returned, do not delete. Should investigate.
// router.delete("/api", (req, res) => {
//     let title = req.query.Title;
//     let tags = req.query.Tags;
//     let desc = req.query.Description;
//     Memory.find({ Title: title, Tags: tags, Description: desc })
//         .then(function (memories) {
//             if (memories.length == 1) {
//                 let id = memories[0]._id;
//                 console.log("id from title: " + title + " = " + id);
//                 Memory.findByIdAndRemove(id)
//                     .then(function (memories) {
//                         console.log("Deleted memory: " + title);
//                         res.send(memories);
//                         //res.send({ success: true, data: memories });
//                     })
//             }
//             else {
//                 res.send('More than one memory found. Delete manually...');
//             }
//         })
//         .catch(function (err) {
//             console.log(err);
//         });
// });

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