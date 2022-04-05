const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    images: {
      type: Object,
      required: true,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Brand', brandSchema);
