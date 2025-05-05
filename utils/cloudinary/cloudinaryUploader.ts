// utils/cloudinaryUploader.ts
import axios from "axios";
import { CLOUDINARY_NAME, CLOUDINARY_PERSISTENT } from "@/api";
import { FolderName } from "@/redux/types";

export const uploadToCloudinary = async (image: File, folderName: FolderName) => {
  if (!image) return null;

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", CLOUDINARY_PERSISTENT);
  formData.append("folder", folderName);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
    formData
  );

  if (response?.data) {
    return {
      asset_id: response.data.asset_id,
      secure_url: response.data.secure_url,
      url: response.data.url,
      public_id: response.data.public_id,
    };
  }

  return null;
};
