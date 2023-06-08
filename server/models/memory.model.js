const mongoose = require("mongoose");

var memorySchema = new mongoose.Schema({
  Title: {
    type: String,
    required: 'This field is required'
  },

  Tags: {
    type: String
  },

  Date: {
    type: String
  },

  Description: {
    type: String
  },

  URL: {
    type: String
  },

  Note: {
    type: String
  }
});

// Name the model "Memory" which points to this schema
mongoose.model("Memory", memorySchema);