const fs = require('fs');
const path = require('path');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors')
const cloudinary = require('cloudinary').v2;

const uploadProductImage = async (req, res) => {
    if (!req.files) {
        throw new BadRequestError('No File Uploaded');
    }
    const productImage = req.files.image;

    if (!productImage.mimetype.startsWith('image')) {
        throw new BadRequestError('Please Upload Image');
    }
    const maxSize = 1024 * 1024;
    if (productImage.size > maxSize) {
        throw new BadRequestError('Please upload image smaller 1MB');
    }
    const imagePath = path.join(__dirname, `../public/uploads/${productImage.name}`);
    await productImage.mv(imagePath);
    res.status(StatusCodes.OK).json({ image: { src: `/uploads/${productImage.name}` } });
};

const uploadProductImageCloudinary = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        use_filename: true,
        folder: 'FileUploadNodeJS'
    });
    fs.unlinkSync(req.files.image.tempFilePath);
    res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
}

module.exports = {
    uploadProductImage,
    uploadProductImageCloudinary
}