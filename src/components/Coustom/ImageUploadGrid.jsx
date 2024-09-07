import React, { useState, useEffect } from 'react';
import { ImagePlus, X, MoveIcon } from "lucide-react";

function UploadFile({ img, file, onChange, onRemove, index, onDragStart, onDragOver, isActive }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onChange(file, index);
    }
  };

  return (
    <div 
      className={`aspect-square border-2 border-dashed rounded-md flex items-center justify-center relative 
        ${isActive ? 'border-gray-300 bg-gray-50 hover:bg-gray-100' : 'border-gray-200 bg-gray-100'}`}
      draggable={img ? true : false}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
    >
      {img ? (
        <>
          <img src={img} alt={`Uploaded image ${index + 1}`} className="w-full h-full object-cover" />
          <button 
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
            onClick={() => onRemove(index)}
          >
            <X size={16} />
          </button>
          <div className="absolute top-1 left-1 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center">
            {index + 1}
          </div>
          <MoveIcon className="absolute bottom-1 right-1 text-white" size={20} />
        </>
      ) : isActive ? (
        <label className="cursor-pointer">
          <ImagePlus className="w-8 h-8 text-gray-400" />
          <input 
            type="file" 
            className="hidden" 
            onChange={handleFileChange}
            accept="image/*"
          />
        </label>
      ) : (
        <ImagePlus className="w-8 h-8 text-gray-300" />
      )}
    </div>
  );
}

export default function ImageUploadGrid({ onChange, initialImages = [] }) {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    // Initialize with initial images
    setImages(initialImages);
    setFiles(initialImages.map(() => null)); // No file objects for initial images
  }, [initialImages]);

  const handleUpload = (file, index) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newImages = [...images];
      const newFiles = [...files];
      newImages[index] = e.target.result;
      newFiles[index] = file;
      setImages(newImages);
      setFiles(newFiles);
      onChange(newImages);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (index) => {
    const newImages = [...images];
    const newFiles = [...files];
    newImages.splice(index, 1);
    newFiles.splice(index, 1);
    setImages(newImages);
    setFiles(newFiles);
    onChange(newImages);
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index) => {
    if (draggedIndex !== null && draggedIndex !== index && index < images.length) {
      const newImages = [...images];
      const newFiles = [...files];
      const [movedImage] = newImages.splice(draggedIndex, 1);
      const [movedFile] = newFiles.splice(draggedIndex, 1);
      newImages.splice(index, 0, movedImage);
      newFiles.splice(index, 0, movedFile);
      setImages(newImages);
      setFiles(newFiles);
      setDraggedIndex(index);
      onChange(newImages);
    }
  };

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
      {[...Array(6)].map((_, index) => (
        <UploadFile
          key={index}
          img={images[index]}
          file={files[index]}
          onChange={handleUpload}
          onRemove={handleRemove}
          index={index}
          onDragStart={() => handleDragStart(index)}
          onDragOver={() => handleDragOver(index)}
          isActive={index === 0 || index < images.length + 1}
        />
      ))}
    </div>
  );
}