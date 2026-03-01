const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'nova-design',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 1200, quality: 85, fetch_format: 'webp' }],
    },
});

const upload = multer({ storage });

const processImage = (req, res, next) => {
    if (req.file) {
        req.file.url = req.file.path; // Cloudinary returns full URL in path
    }
    next();
};

module.exports = { upload, processImage };
