const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staticDataSchema = new Schema(
  {
    hospital: {
      type: String,
    },
    state: {
      type: String,
    },
    category: {
      type: String,
    },
    officialBed: {
      type: String,
    },
    operatingBed: {
      type: String,
    },
    patientAdmission: {
      type: String,
    },
    dailyAdmission: {
      type: String,
    },
    bedUsageRate: {
      type: String,
    },
    averageStay: {
      type: String,
    },
    bedDurationCleared: {
      type: String,
    },
  },
  { timestamps: true }
);

const StaticData = mongoose.model("StaticData", staticDataSchema);
module.exports = StaticData;
