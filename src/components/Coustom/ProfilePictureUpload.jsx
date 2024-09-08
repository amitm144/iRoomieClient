import React, { useState } from 'react';
import { UserRound, X } from "lucide-react";

export default function ProfilePictureUpload({ onChange , currentImage}) {
  const [img, setImg] = useState(currentImage || null);
  const [file, setFile] = useState(null);

  const handleUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImg(e.target.result);
        setFile(uploadedFile);
        if (typeof onChange === 'function') {
          onChange(uploadedFile);
        } 
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation(); // Prevent triggering file upload
    setImg(null);
    setFile(null);
    if (typeof onChange === 'function') {
      onChange(null);
    } 
  };

  return (
    <div className="flex w-full items-center justify-center">
      <label
        className="flex cursor-pointer flex-col items-center justify-center 
        border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100
        rounded-full w-24 h-24 sm:w-36 sm:h-36 relative"
      >
        {img ? (
          <>
            <img src={img} alt="Profile picture" className="w-full h-full object-cover rounded-full" />
            <button 
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/3 -translate-y-1/3"
              onClick={handleRemove}
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <UserRound className="h-8 w-8 lg:h-16 lg:w-16 text-gray-400" />
            <p className="text-xs lg:text-sm text-gray-500 text-center mt-2">
              <span className="font-semibold">Upload</span> photo
            </p>
          </>
        )}
        <input 
          type="file" 
          className="hidden" 
          onChange={handleUpload}
          accept="image/*"
        />
      </label>
    </div>
  );
}