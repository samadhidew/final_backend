const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema(
  {
    sportCode: {
      type: String,
      required: true,
    },

      date: {
          type: String,
          required: true,
      },
    timeslots: {
        type: Array,
        default: [
          {cinemaSeatID:"6.00",status:1,active:""},
          {cinemaSeatID:"7.00",status:1,active:""},
          {cinemaSeatID:"8.00",status:1,active:""},
          {cinemaSeatID:"9.00",status:1,active:""},
          {cinemaSeatID:"10.00",status:1,active:""},
          {cinemaSeatID:"11.00",status:1,active:""},
          {cinemaSeatID:"12.00",status:1,active:""},
          {cinemaSeatID:"13.00",status:1,active:""},
          {cinemaSeatID:"14.00",status:1,active:""},
          {cinemaSeatID:"15.00",status:1,active:""},
          {cinemaSeatID:"16.00",status:1,active:""},
          {cinemaSeatID:"17.00",status:1,active:""},
        ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Time", timeSchema);
