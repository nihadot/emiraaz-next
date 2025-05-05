// hooks/useCloudinaryUpload.ts
'use client'
import { useState } from "react";
import { errorToast } from "@/components/Toast";
import { getErrorMessage } from "../errorHandler";
import { uploadToCloudinary } from "./cloudinaryUploader";
import { FolderName } from "@/redux/types";

export const useCloudinaryUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (image: File, folderName: FolderName) => {
    try {
      setUploading(true);
      return await uploadToCloudinary(image, folderName);
    } catch (error) {
      errorToast(getErrorMessage(error));
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading };
};
