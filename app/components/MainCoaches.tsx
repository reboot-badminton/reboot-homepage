'use client';

import Image from 'next/image';
import { useState } from 'react';
import { src } from '../image_utils';

export default function MainCoaches() {
  const [isLeftExpanded, setIsLeftExpanded] = useState(true);

  const handleClick = (side: string) => {
    setIsLeftExpanded(side === 'left');
  };

  const leftClipPath = isLeftExpanded
    ? 'polygon(0 0, 80% 0, 100% 100%, 0 100%)'
    : 'polygon(0 0, 20% 0, 10% 100%, 0 100%)';

  const rightClipPath = isLeftExpanded
    ? 'polygon(80% 0, 100% 0, 100% 100%, 95% 100%)'
    : 'polygon(20% 0, 100% 0, 100% 100%, 5% 100%)';

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out bg-cover bg-center cursor-pointer"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${src(
            '/slide/1.jpeg'
          )})`,
          clipPath: leftClipPath,
        }}
        onClick={() => handleClick('left')}
      >
        <div className="absolute top-2 left-2 flex items-start">
          <Image
            src={src('/antroke.jpg')}
            alt="an"
            width={48}
            height={48}
            className="inline-block mr-4"
          />
          <div className="inline-block text-white">
            <h2 className="text-2xl font-bold tracking-wider">안진욱</h2>
            <span className="text-sm">레슨 경력 10년차 코치</span>
          </div>
        </div>
        {isLeftExpanded && (
          <div className="absolute bottom-4 left-4 w-full text-white">
            <h3 className="text-sm mt-4 mb-2 bold">레슨 이력</h3>
            <ul className="leading-4 text-xs ml">
              <li>리부트배드민턴장 대표 코치</li>
              <li>서울과학기술대학교 코치</li>
              <li>블루코트배드민턴장 코치</li>
              <li>바로배드민턴장 아카데미 코치</li>
              <li>와우실내배드민턴장 야간 코치</li>
              <li>엘리트 선수 개인 코치</li>
              <li>... 외 다수</li>
            </ul>
            <h3 className="text-sm mt-4 mb-2 bold">수상 이력</h3>
            <ul className="leading-4 text-xs">
              <li>2023 코리아민턴사랑 프리미엄 리그 (4차) 준자강 우승</li>
              <li>2023 제7회 인제내린천배 오픈 준자강 우승</li>
              <li>2022 제2회 올곧은병원장배 대구광역시 준자강 준우승</li>
              <li>2022 제2회 올곧은병원장배 대구광역시 자강조 준우승</li>
              <li>2021 코리아민턴사랑 프리미엄 리그 (1차) 준자강 우승</li>
              <li>2021 제 19회 다이요컵 전국대회 준자강 우승</li>
              <li>2021 잼TV 미니게임 준자강 우승</li>
              <li>...외 다수</li>
            </ul>
          </div>
        )}
      </div>
      <div
        className="absolute top-0 right-0 w-full h-full transition-all duration-300 ease-in-out bg-cover bg-center cursor-pointer"
        style={{
          backgroundImage: `url(${src('/slide/2.jpeg')})`,
          clipPath: rightClipPath,
        }}
        onClick={() => handleClick('right')}
      >
        <div className="absolute top-2 right-2 backdrop-blur-sm">
          <Image
            src={src('/reboot-icon.png')}
            alt="yoon"
            width={48}
            height={48}
          />
        </div>
        {!isLeftExpanded && (
          <div className="absolute bottom-4 right-4 w-1/2 text-white">
            <h2 className="text-2xl font-bold mb-2 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
              윤재원
            </h2>
            <p>윤 코치에 대한 설명을 여기에 추가하세요.</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              dolorem, provident veritatis quos, nesciunt, officia explicabo
              consequuntur doloribus eaque saepe quidem! Accusamus, culpa?
              Molestiae soluta veniam earum, ullam adipisci ratione.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
