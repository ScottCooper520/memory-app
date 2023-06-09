const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/MemoryDB')
    .catch(error => handleError(error));

console.log("Connected to database...");
  
require("./memory.model");