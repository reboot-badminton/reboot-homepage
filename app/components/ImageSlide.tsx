'use client';

import BlurredImage, { ImageProps } from './BlurredImage';
import { useState, useEffect, useCallback } from 'react';

interface Props {
  srcs: ImageProps[];
}

// 여러 개의 이미지를 슬라이드 형식으로 보여주는 컴포넌트
// 좌우 화살표와 인디케이터 표시
// 화살표와 인디케이터로 이미지 간 이동 가능
// 인디케이터는 총 몇 개의 이미지가 있고, 지금 몇 번째 이미지인지 알 수 있게끔 표시
// 일정 시간이 지날때마다 다음 이미지로 이동
export default function ImageSlide({ srcs }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + srcs.length) % srcs.length);
  }, [srcs.length]);
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % srcs.length);
  }, [srcs.length]);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [isHovered, nextSlide]);

  const handleMouseOver = useCallback(() => {
    setIsHovered(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div
      className="w-full h-80 relative"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <BlurredImage
        src={srcs[currentIndex].src}
        alt={srcs[currentIndex].alt}
        priority={currentIndex === 0}
      />
      <button
        className="absolute left-0 top-1/2 transform h-10 rounded-xl bg-blue-400 hover:bg-blue-300 mx-1 -mt-[10px] -translate-y-1/2 text-white p-2 group"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute right-0 top-1/2 transform h-10 rounded-xl bg-blue-400 hover:bg-blue-300 mx-1 -mt-[10px] -translate-y-1/2 text-white p-2 group"
        onClick={nextSlide}
      >
        &#10095;
      </button>
      <div className="absolute left-1/2 bottom-2 -translate-x-1/2 flex justify-center mt-4">
        {srcs.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 mx-1 rounded-full border-2 ${
              index === currentIndex ? 'bg-blue-400' : 'bg-gray-300'
            } transition-all duration-500 ease-in-out hover:cursor-pointer`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
