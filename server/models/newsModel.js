const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },

    content: {
      type: Object,
      required: true,
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
module.exports = mongoose.model('News', newsSchema);
