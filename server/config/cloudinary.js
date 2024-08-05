import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config'; // loads the .env file

export const cloudinaryConfig = () => {
  // Configuration
  console.log(process.env.CLOUD_API_KEY);
  cloudinary.config({
    //
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET,
  });
};

export default cloudinaryConfig;
