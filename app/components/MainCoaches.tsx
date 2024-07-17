'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { src } from '../image_utils';

interface Section {
  title: string;
  items: string[];
}

interface Coach {
  name: string;
  title: string;
  sections: Section[];
}

const an: Coach = {
  name: '안진욱',
  title: '레슨 경력 10년차 코치',
  sections: [
    {
      title: '레슨 이력',
      items: [
        '리부트배드민턴장 대표 코치',
        '서울과학기술대학교 코치',
        '블루코트배드민턴장 코치',
        '바로배드민턴장 아카데미 코치',
        '와우실내배드민턴장 야간 코치',
        '엘리트 선수 개인 코치',
        '... 외 다수',
      ],
    },
    {
      title: '수상 이력',
      items: [
        '2023 코리아민턴사랑 프리미엄 리그 (4차) 준자강 우승',
        '2023 제7회 인제내린천배 오픈 준자강 우승',
        '2022 제2회 올곧은병원장배 대구광역시 준자강 준우승',
        '2022 제2회 올곧은병원장배 대구광역시 자강조 준우승',
        '2021 코리아민턴사랑 프리미엄 리그 (1차) 준자강 우승',
        '2021 제 19회 다이요컵 전국대회 준자강 우승',
        '2021 잼TV 미니게임 준자강 우승',
        '...외 다수',
      ],
    },
  ],
};

const yoon: Coach = {
  name: '윤재원',
  title: '레슨 경력 10년차 코치',
  sections: [
    {
      title: '레슨 이력',
      items: [
        '리부트배드민턴장 대표 코치',
        '서울과학기술대학교 코치',
        '블루코트배드민턴장 코치',
        '바로배드민턴장 아카데미 코치',
        '와우실내배드민턴장 야간 코치',
        '엘리트 선수 개인 코치',
        '... 외 다수',
      ],
    },
    {
      title: '수상 이력',
      items: [
        '2023 코리아민턴사랑 프리미엄 리그 (4차) 준자강 우승',
        '2023 제7회 인제내린천배 오픈 준자강 우승',
        '2022 제2회 올곧은병원장배 대구광역시 준자강 준우승',
        '2022 제2회 올곧은병원장배 대구광역시 자강조 준우승',
        '2021 코리아민턴사랑 프리미엄 리그 (1차) 준자강 우승',
        '2021 제 19회 다이요컵 전국대회 준자강 우승',
        '2021 잼TV 미니게임 준자강 우승',
        '...외 다수',
      ],
    },
  ],
};

interface CoachProps {
  coach: Coach;
  thumbnailSrc: string;
  backgroundSrc: string;
  align: 'left' | 'right';
  clipPath?: string;
  onClick: () => void;
}
function Coach({
  coach,
  thumbnailSrc,
  backgroundSrc,
  align,
  clipPath,
  onClick,
}: CoachProps) {
  return (
    <div
      className={
        'absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out bg-cover bg-center cursor-pointer ' +
        (align === 'left' ? 'text-left' : 'text-right')
      }
      style={{
        backgroundImage: `linear-gradient(${
          align === 'left' ? '75deg' : '-75deg'
        }, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3)), url(${src(backgroundSrc)})`,
        clipPath: clipPath,
      }}
      onClick={onClick}
    >
      <div
        className={
          'absolute top-2 flex items-start gap-4 ' +
          (align === 'left' ? 'left-2' : 'right-2 flex-row-reverse')
        }
      >
        <Image
          src={src(thumbnailSrc)}
          alt={coach.name}
          width={48}
          height={48}
          className="inline-block"
        />
        <div className="inline-block text-white ">
          <h2 className="text-2xl font-bold tracking-wider">{coach.name}</h2>
          <span className="text-sm">{coach.title}</span>
        </div>
      </div>
      <div className="absolute bottom-4 w-full px-4 text-white">
        {coach.sections.map((section) => (
          <React.Fragment key={coach.name + '-' + section.title}>
            <h3 className="text-sm mt-4 mb-2 bold">{section.title}</h3>
            <ul className="leading-4 text-xs ml">
              {section.items.map((item) => (
                <li key={coach.name + '-' + section.title + '-' + item}>
                  {item}
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function MainCoaches() {
  const [isLeftExpanded, setIsLeftExpanded] = useState(true);

  const handleClick = (side: string) => {
    setIsLeftExpanded(side === 'left');
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <Coach
        coach={an}
        thumbnailSrc="/antroke.jpg"
        backgroundSrc="/slide/1.jpeg"
        align="left"
        onClick={() => handleClick('left')}
      />
      <Coach
        coach={yoon}
        thumbnailSrc="/antroke.jpg"
        backgroundSrc="/slide/2.jpeg"
        align="right"
        clipPath={
          isLeftExpanded
            ? 'polygon(80% 0, 100% 0, 100% 100%, 95% 100%)'
            : 'polygon(20% 0, 100% 0, 100% 100%, 5% 100%)'
        }
        onClick={() => handleClick('right')}
      />
    </div>
  );
}
