const path = require('path');
const { StatusCodes } = require('http-status-codes');

const uploadProductImage = async (req, res) => {
    if (!req.files) {
        throw new CustomError.BadRequestError('No File Uploaded');
    }
    const productImage = req.files.image;
    
    if (!productImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please Upload Image');
    }
    const maxSize = 1024 * 1024;
    if (productImage.size > maxSize) {
        throw new CustomError.BadRequestError('Please upload image smaller 1MB');
    }
    const imagePath = path.join(__dirname, `../public/uploads/${productImage.name}`);
    await productImage.mv(imagePath);
    res.status(StatusCodes.OK).json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = {
    uploadProductImage,
}