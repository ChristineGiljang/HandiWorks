const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: String,
    category: String,
    tags: [String],
    rate: { type: Number, required: true },
    availability: [
      {
        day: String,
        startTime: String,
        endTime: String,
      },
    ],
    // NEW: GeoJSON location (lng, lat)
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    locationRadius: Number,
    photos: [String],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

serviceSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Service", serviceSchema);
