const env               = require('dotenv')
const multer            = require('multer');
const cloudinary        = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

env.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: "media",
  alowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
});

exports.parser = multer({
  storage
});

module.exports = exports;
