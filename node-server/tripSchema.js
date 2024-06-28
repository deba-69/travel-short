const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Sequence = require('./sequenceSchema');

// Define the Trip schema
const TripSchema = new Schema({
  tripId: {
    type:Number
  },
  locationName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  tripCoordinatorName: {
    type: String,
    required: true
  },
  tripCoordinatorContactNumber: {
    type: String,
    required: true
  },
  tripDescription: {
    type: String,
    required: true
  },
  vacancy: {
    type: Number,
    required: true,
    min: 0
  }
});

TripSchema.pre('save', async function(next) {
    if (!this.isNew) {
      return next();
    }
    try {
      const sequence = await Sequence.findByIdAndUpdate(
        { _id: 'tripId' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).exec();
      this.tripId = sequence.sequence_value;
      next();
    } catch (err) {
      next(err);
    }
  });

// Create a model using the schema
const Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;
