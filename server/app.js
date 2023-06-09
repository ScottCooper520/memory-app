// Start up the MongoDB database server
require('./models/db');

// This is an express.js web server
let express = require('express');
let app = express();
const path = require('path');
const bodyParser = require("body-parser");

const memoryController = require('./controllers/memoryController');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// This is how to get client (public) content relative to server folder.
// Paths are relative to server folder (where node app is located).
app.use(express.static('../client/public'));
// OK when photos are stored in images folder in client/public...
// app.use('/images', express.static(path.join(__dirname, '/images')));
// OK to access shared Coopcraft network drive
// Note the use of double-double leading backslashes as this is a shared drive
// Accessed with e.g.: localhost:5000/Photos/img001.jpg

// Not usre how to adjust server image retrieval going from linux to windows.
// app.use('/Photos', express.static('\\\\Coopcraft\\nuc8tb\\Pictures\\Family\\WeddingRelated\\SnLWeddingOfficialPhotos'));

// This returns an image from drive 'F' which is SafeDep4TBb (unlike getting images from server above)
app.use('/Photos', express.static('/mnt/f/Pictures/Family/OregonMay2023'));

// I am thinking that this file (app.js) will just serve the default html/supporting files
// as required by index.html (i.e. the 'home' page).
// All data-centric calls will be handled with the memoryController.js file.

// API calls...
// ============
// Root GET will return content needed for client.
// I.e. this gets called with url http://localhost:5000
app.get('/', (req, res) => {
    console.log("Return from slash...");
    // To return a single file from public:
    // res.sendFile(path.join(__dirname, '../client/public/index.html'));
    // To return all files in public:
    res.sendFile(path.join(__dirname, '../client/public/'));
});

app.listen(5000, () => {
    console.log('Node (express) server is running on 5000...');
});

// This spins up the database controller
app.use("/memory", memoryController);