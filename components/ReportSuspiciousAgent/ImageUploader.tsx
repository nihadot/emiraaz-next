import React, { useState } from "react";

type ImageUploaderProps = {
  renderPreview?: (preview: string | null, handleDelete: () => void) => React.ReactNode;
  renderControls?: (handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => React.ReactNode;
  onUpload?: (file: File | null) => void;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  renderPreview,
  renderControls,
  onUpload,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [webpFile, setWebpFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    if (file.size > 200 * 1024) {
      alert("File must be under 200KB");
      return;
    }

    // Preview
    setPreview(URL.createObjectURL(file));

    // Convert to WebP
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const webp = new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
              type: "image/webp",
            });
            setWebpFile(webp);
            onUpload?.(webp);
          }
        },
        "image/webp",
        0.9
      );
    };
  };

  const handleDelete = () => {
    setPreview(null);
    setWebpFile(null);
    onUpload?.(null);
  };

  return (
    <div className="">
      {preview && renderPreview
        ? renderPreview(preview, handleDelete)
        : (
          <>
            {renderControls
              ? renderControls(handleFileChange)
              : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block"
                />
              )}
          </>
        )}

      {/* {webpFile && (
        <p className="text-xs mt-2 text-gray-500">
          ✅ Converted to WebP: {webpFile.name} ({(webpFile.size / 1024).toFixed(1)} KB)
        </p>
      )} */}
    </div>
  );
};

export default ImageUploader;
