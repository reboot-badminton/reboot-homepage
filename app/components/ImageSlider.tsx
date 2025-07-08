"use client";

import { ImageProps } from "@/components/BlurredImage";
import { PropsWithChildren, useEffect, useState } from "react";

interface Props {
  srcs: ImageProps[];
}

const ImageSlider = ({
  srcs,
  children,
}: PropsWithChildren<Props>) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % srcs.length);
  };

  useEffect(() => {

    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [handleNext]);

  const handleBack = () => {
    setCurrentImage((prev) => (prev - 1 + srcs.length) % srcs.length);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <div className="relative w-full h-svh overflow-clip">
      <div className="absolute top-0 left-0 w-full h-full">
        {srcs.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`absolute w-full h-full object-cover transition-all duration-500 ease-in-out ${index === currentImage ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              }`}
          />
        ))}
      </div>
      <div className="absolute top-16 bottom-24 left-0 right-0">{children}</div>
      <div
        className="absolute left-4 top-1/2 w-20 h-20 py-4 pl-5 mobile:w-8 p-2 cursor-pointer rounded-full bg-black bg-opacity-20 hover:bg-opacity-50 transition-all duration-300"
        onClick={handleBack}
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA5AQMAAAAbVwlvAAAABlBMVEVHcEz///+flKJDAAAAAXRSTlMAQObYZgAAADhJREFUGNNjYGBg4AFiBhkQYQEiCkDEAyBmPAAkmBuABDtIiI8uyiAsC7gsWB1YB1gv2BQ6KeQBAFwUFG/o5+mVAAAAAElFTkSuQmCC" className="w-[30px] h-[50px]"/>
      </div>
      <div
        className="absolute right-4 top-1/2 w-20 h-20 py-4 pl-7 mobile:w-8 p-2 cursor-pointer rounded-full bg-black bg-opacity-20 hover:bg-opacity-50 transition-all duration-300"
        onClick={handleNext}
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA5AQMAAAAbVwlvAAAABlBMVEVHcEz///+flKJDAAAAAXRSTlMAQObYZgAAADRJREFUGNNjOMAABA9ARAGIsAARMiCCD0SwgwjmBiDBSEeFFnCxBzB1YB3scFNorowBpAwAlX8Wm6/WG/sAAAAASUVORK5CYII=" className="w-[30px] h-[50px]" />
      </div>
      <div className="absolute right-16 mobile:right-4 bottom-4 flex justify-center mt-4">
        {srcs.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 mx-1 rounded-full cursor-pointer border-2 ${index === currentImage ? 'bg-blue-400' : 'bg-gray-300'
              } transition-all duration-500 ease-in-out`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;