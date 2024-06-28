const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SequenceSchema = new Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 0 }
  });
  
  const Sequence = mongoose.model('Sequence', SequenceSchema);
  
  module.exports = Sequence;