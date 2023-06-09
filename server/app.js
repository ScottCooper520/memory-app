// Start up the MongoDB database server
require('./models/db');

// This is an express.js web server
let express = require('express');
let app = express();
const path = require('path');
const bodyParser = require("body-parser");

// This contains the API calls that handle memory management
const memoryController = require('./controllers/memoryController');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// This is how to get client (public) content relative to server folder.
// Paths are relative to server folder (where node app is located).
app.use(express.static('../client/public'));

// This returns an image from drive 'F' which is SafeDep4TBb.
// I think 'mnt' (bridge to windows file system) is automatically available because I am using WSL. Otherwise, 
// I believe we would need to mount this file via a script (which is how I did it for the home server).
app.use('/Photos', express.static('/mnt/f/Pictures/Family/OregonMay2023'));

// This file (app.js) will just serve the default html/supporting files
// as required by index.html (i.e. the home '/' page).
// All data-centric calls will be handled with the memoryController.js file.
// The images are an exception as they need no controller to access them - just the '<img src' tag
// on the client side, which accesses above with: "http://localhost:5000/Photos/" + imgName ...

// API calls...
// ============
// Root GET will return content needed for client.
// I.e. this gets called with url http://localhost:5000
app.get('/', (req, res) => {
    console.log("Return from slash...");
    // To return all files in public:
    res.sendFile(path.join(__dirname, '../client/public/'));
});

app.listen(5000, () => {
    console.log('Node (express) server is running on 5000...');
});

// This spins up the database controller
app.use("/memory", memoryController);