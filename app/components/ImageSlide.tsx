"use client"
import BlurredImage from "./BlurredImage";
import { useState, useEffect } from "react";
interface Props {
  srcs: string[]
};

// 여러 개의 이미지를 슬라이드 형식으로 보여주는 컴포넌트
// 좌우 화살표와 인디케이터 표시
// 화살표와 인디케이터로 이미지 간 이동 가능
// 인디케이터는 총 몇 개의 이미지가 있고, 지금 몇 번째 이미지인지 알 수 있게끔 표시
// 일정 시간이 지날때마다 다음 이미지로 이동
export default function ImageSlide({ srcs }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const prevSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + srcs.length) % srcs.length)
  };
  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % srcs.length)
  };
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide()
      }, 3000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [isHovered])

  const handleMouseOver = (): void => {
    setIsHovered(true)
  }
  const handleMouseLeave = (): void => {
    setIsHovered(false)
  }
  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
  };
  return (
    <div
      className="w-full h-80 relative"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <BlurredImage src={`/slide/${srcs[currentIndex]}.jpg`} />
      <button
        className="absolute left-0 top-1/2 transform h-10 rounded-xl hover:bg-[#1a222f] mx-1 -mt-[10px] -translate-y-1/2 bg-[#111927] text-white p-2 group"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute right-0 top-1/2 transform h-10 rounded-xl hover:bg-[#1a222f] mx-1 -mt-[10px] -translate-y-1/2 bg-[#111927] text-white p-2 group"
        onClick={nextSlide}
      >
        &#10095;
      </button>

      <div className="flex justify-center mt-4">
        {srcs.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-10 mx-1 ${
              index === currentIndex
                ? "bg-[#beff46] rounded-xl"
                : "bg-gray-300 rounded-xl"
            } transition-all duration-500 ease-in-out hover:cursor-pointer`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  )
}
