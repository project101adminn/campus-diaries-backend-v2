const mongoose = require('mongoose');

const callingCodeSchema = new mongoose.Schema({
  callingCode: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('CallingCode', callingCodeSchema);
