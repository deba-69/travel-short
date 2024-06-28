//locationModel.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  loc_id: Number,
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  place: {
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    }
  },
  coordinate: {
    type: [Number],
    required: true
  },
  imgname: String,
  Info: {
    highlight: {
      type: [String],
      required: true
    },
    fulldescription: {
      type: String,
      required: true
    },
    Duration: String,
    Distance: String,
    Difficulty: String,
    Price: Number
  }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
