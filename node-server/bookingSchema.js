const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Sequence = require('./sequenceSchema');
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const SequenceSchema = new Schema({
//   _id: { type: String, required: true },
//   sequence_value: { type: Number, default: 0 }
// });

// const Sequence = mongoose.model('Sequence', SequenceSchema);

// module.exports = Sequence;

// Define the Booking schema
const BookingSchema = new Schema({
    bookingId: {
        type: Number
    },
  locationName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  tripId: {
    type: Number,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

BookingSchema.pre('save', async function(next) {
    if (!this.isNew) {
      return next();
    }
    try {
      const sequence = await Sequence.findByIdAndUpdate(
        { _id: 'bookingId' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).exec();
      this.bookingId = sequence.sequence_value;
      next();
    } catch (err) {
      next(err);
    }
  });
// Create a model using the schema
const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
