import CryptoJS from "crypto-js";
import { UPLOAD_PRESET, CLOUD_NAME } from "../utils/contants";

export const uploadImageToCloudinary = async (imgFile, folderName) => {
  const formData = new FormData();
  formData.append('file', imgFile);
  formData.append('upload_preset', UPLOAD_PRESET); // Replace 'vamfilm' with your actual unsigned upload preset name
  formData.append('cloud_name', CLOUD_NAME); // Replace 'dymypfkt4' with your actual Cloudinary cloud name

  // Set the folder parameter
  if (folderName) {
    formData.append('folder', folderName); // Specify folder name for organized storage
  }

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data.secure_url; // Return the image URL from Cloudinary
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

// Function to delete an image from Cloudinary
export const deleteImageFromCloudinary = async (publicId) => {
  const timestamp = Math.round((new Date()).getTime() / 1000);
  const apiKey = '388192654396886';  // Replace with your actual API key
  const apiSecret = 'JcFTcLCM_Fti0y5dIoS8imtfTBY';  

  // Generate the signature for authentication
  const signature = CryptoJS.SHA1(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`).toString();

  const formData = new FormData();
  formData.append('public_id', publicId);
  formData.append('timestamp', timestamp);
  formData.append('api_key', apiKey);
  formData.append('signature', signature);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`, {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    return result; // Returns the result of the deletion operation
  } catch (error) {
    console.error('Delete failed:', error);
    throw error;
  }
};