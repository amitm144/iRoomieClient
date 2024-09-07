import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Helper function to determine grid layout
  const getGridLayout = (count) => {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-2 grid-rows-2";
    return "grid-cols-4 grid-rows-2";
  };

  return (
    <Dialog>
      {/* Mobile View */}
      <div className="block sm:hidden">
        <DialogTrigger asChild>
          <div className="relative w-full h-64 overflow-hidden rounded-lg">
            <img
              src={images[0]}
              alt="Main apartment view"
              className="w-full h-full object-cover cursor-pointer"
            />
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              1 / {images.length}
            </div>
          </div>
        </DialogTrigger>
      </div>

      {/* Desktop View */}
      <div
        className={`hidden sm:grid ${getGridLayout(images.length)} gap-2 h-96`}
      >
        {images.slice(0, Math.min(5, images.length)).map((img, index) => (
          <DialogTrigger asChild key={index}>
            <div
              className={cn(
                "cursor-pointer overflow-hidden relative",
                index === 0 && images.length > 1 && "row-span-2", // First image spans 2 rows,
                images.length >= 4 && index === 0 && "col-span-2",
                images.length === 4 && index === 3 && "col-span-2"
              )}
            >
              <img
                src={img}
                alt={`Apartment view ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {index === 4 && images.length > 5 && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    +{images.length - 5} more
                  </span>
                </div>
              )}
            </div>
          </DialogTrigger>
        ))}
      </div>

      <DialogContent className="w-11/12 max-w-5xl p-0 overflow-hidden">
        <DialogHeader className="p-4">
          <DialogTitle>Apartment Gallery</DialogTitle>
        </DialogHeader>
        <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh]">
          <img
            src={images[selectedImage]}
            alt={`Apartment view ${selectedImage + 1}`}
            className="w-full h-full object-contain bg-gray-100"
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
        <ScrollArea className="w-full mt-4">
          <div className="flex gap-2 p-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover cursor-pointer rounded-md transition-opacity duration-200 ${
                  selectedImage === index
                    ? "opacity-100 ring-2 ring-blue-500"
                    : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
