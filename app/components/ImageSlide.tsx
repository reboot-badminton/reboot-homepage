'use client';

import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { ImageProps } from '../../components/BlurredImage';
import ImageFadeIn from './ImageFadeIn';

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
  const [isSlidable, setIsSlidable] = useState(false);

  const onFadeEnd = useCallback(() => {
    setIsSlidable(true);
  }, [setIsSlidable]);

  const move = useCallback((delta: number) => {
    if (!isSlidable) return;
    setIsSlidable(false);
    setCurrentIndex((prevIndex) => (prevIndex + delta + srcs.length) % srcs.length);
  }, [isSlidable, srcs.length]);

  useEffect(() => {
    if (!isSlidable) return;

    const interval = setInterval(() => {
      move(1);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [isSlidable, move]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div className="w-full h-svh relative overflow-clip"    >
      <ImageFadeIn src={srcs[currentIndex]} onFadeEnd={onFadeEnd} />
      <div className="absolute top-16 bottom-24 left-0 right-0">{children}</div>
      <div
        className={'absolute left-4 top-1/2 w-12 mobile:w-8 p-2 cursor-pointer transition-transform' + (isSlidable ? ' hoverable:hover:scale-125 active:scale-125' : '')}
        onClick={() => move(-1)}
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA5AQMAAAAbVwlvAAAABlBMVEVHcEz///+flKJDAAAAAXRSTlMAQObYZgAAADhJREFUGNNjYGBg4AFiBhkQYQEiCkDEAyBmPAAkmBuABDtIiI8uyiAsC7gsWB1YB1gv2BQ6KeQBAFwUFG/o5+mVAAAAAElFTkSuQmCC" />
      </div>
      <div
        className={'absolute right-4 top-1/2 w-12 mobile:w-8 p-2 cursor-pointer transition-transform' + (isSlidable ? ' hoverable:hover:scale-125 active:scale-125' : '')}
        onClick={() => move(1)}
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA5AQMAAAAbVwlvAAAABlBMVEVHcEz///+flKJDAAAAAXRSTlMAQObYZgAAADRJREFUGNNjOMAABA9ARAGIsAARMiCCD0SwgwjmBiDBSEeFFnCxBzB1YB3scFNorowBpAwAlX8Wm6/WG/sAAAAASUVORK5CYII=" />
      </div>
      <div className="absolute right-16 mobile:right-4 bottom-4 flex justify-center mt-4">
        {srcs.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 mx-1 rounded-full border-2 ${index === currentIndex ? 'bg-blue-400' : 'bg-gray-300'
              } transition-all duration-500 ease-in-out hover:cursor-pointer`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
