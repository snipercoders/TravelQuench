
// // src/lib/cloudinary/upload.ts
// import cloudinary from './config';

// export const uploadImage = async (file: any, folder: string = 'travel-quench'): Promise<string> => {
//   try {
//     const result = await cloudinary.uploader.upload(file, {
//       folder,
//       resource_type: 'auto',
//     });
//     return result.secure_url;
//   } catch (error) {
//     console.error('Cloudinary upload error:', error);
//     throw new Error('Failed to upload image');
//   }
// };

// export const deleteImage = async (publicId: string): Promise<void> => {
//   try {
//     await cloudinary.uploader.destroy(publicId);
//   } catch (error) {
//     console.error('Cloudinary delete error:', error);
//     throw new Error('Failed to delete image');
//   }
// };



// // src/lib/cloudinary/upload.ts
// import cloudinary from './config';

// export const uploadImage = async (file: File | string, folder: string = 'travel-quench'): Promise<string> => {
//   try {
//     const result = await cloudinary.uploader.upload(file, {
//       folder,
//       resource_type: 'auto',
//     });
//     return result.secure_url;
//   } catch (error) {
//     console.error('Cloudinary upload error:', error);
//     throw new Error('Failed to upload image');
//   }
// };

// export const deleteImage = async (publicId: string): Promise<void> => {
//   try {
//     await cloudinary.uploader.destroy(publicId);
//   } catch (error) {
//     console.error('Cloudinary delete error:', error);
//     throw new Error('Failed to delete image');
//   }
// };





// src/lib/cloudinary/upload.ts
import cloudinary from './config';

// Helper function to convert File to base64 data URL
const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const uploadImage = async (file: File | string, folder: string = 'travel-quench'): Promise<string> => {
  try {
    let uploadData: string;

    if (file instanceof File) {
      // Convert File object to base64 data URL
      uploadData = await fileToDataURL(file);
    } else {
      // If it's already a string (file path or data URL), use it directly
      uploadData = file;
    }

    const result = await cloudinary.uploader.upload(uploadData, {
      folder,
      resource_type: 'auto',
    });
    
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
};

export const deleteImage = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image');
  }
};