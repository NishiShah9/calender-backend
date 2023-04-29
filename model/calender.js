const mongoose = require("mongoose");

const CalenderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  fullDate: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("calender", CalenderSchema);
