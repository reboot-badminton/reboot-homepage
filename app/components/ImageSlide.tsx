'use client';

import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { ImageProps } from '../../components/BlurredImage';
import Image from 'next/image';

interface Props {
  srcs: ImageProps[];
}

// 여러 개의 이미지를 슬라이드 형식으로 보여주는 컴포넌트
// 좌우 화살표와 인디케이터 표시
// 화살표와 인디케이터로 이미지 간 이동 가능
// 인디케이터는 총 몇 개의 이미지가 있고, 지금 몇 번째 이미지인지 알 수 있게끔 표시
// 일정 시간이 지날때마다 다음 이미지로 이동
export default function ImageSlide({
  srcs,
  children,
}: PropsWithChildren<Props>) {
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
      className="w-full h-svh relative overflow-clip"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {srcs.map((src, index) => (
        <Image
          key={index}
          src={src.src}
          alt={src.alt}
          fill={true}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority={index === 0}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute top-16 bottom-24 left-0 right-0">{children}</div>
      <div
        className="absolute left-4 top-1/2 w-12 mobile:w-8 p-2 cursor-pointer transition-transform hoverable:hover:scale-125 active:scale-125"
        onClick={prevSlide}
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA5AQMAAAAbVwlvAAAABlBMVEVHcEz///+flKJDAAAAAXRSTlMAQObYZgAAADhJREFUGNNjYGBg4AFiBhkQYQEiCkDEAyBmPAAkmBuABDtIiI8uyiAsC7gsWB1YB1gv2BQ6KeQBAFwUFG/o5+mVAAAAAElFTkSuQmCC" />
      </div>
      <div
        className="absolute right-4 top-1/2 w-12 mobile:w-8 p-2 cursor-pointer transition-transform hoverable:hover:scale-125 active:scale-125"
        onClick={nextSlide}
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA5AQMAAAAbVwlvAAAABlBMVEVHcEz///+flKJDAAAAAXRSTlMAQObYZgAAADRJREFUGNNjOMAABA9ARAGIsAARMiCCD0SwgwjmBiDBSEeFFnCxBzB1YB3scFNorowBpAwAlX8Wm6/WG/sAAAAASUVORK5CYII=" />
      </div>
      <div className="absolute right-16 mobile:right-4 bottom-4 flex justify-center mt-4">
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
