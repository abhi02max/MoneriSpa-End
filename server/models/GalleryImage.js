const mongoose = require('mongoose');

const GalleryImageSchema = new mongoose.Schema({
  tagline: { type: String, required: false },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('GalleryImage', GalleryImageSchema);