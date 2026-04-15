import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary once
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            resource_type: 'auto',
        });
        fs.unlinkSync(file);
        return result.secure_url;
    } catch (error) {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
        console.error('Cloudinary upload error:', error);
        throw error; // Re-throw to handle in caller
    }
};

export default uploadOnCloudinary;