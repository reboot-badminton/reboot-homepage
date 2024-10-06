'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { src } from './image_utils';
import { Open_Sans } from 'next/font/google';

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
  title: '레슨 경력 10년차 선수 출신 코치',
  sections: [
    {
      title: '레슨 이력',
      items: [
        '현) 리부트배드민턴장 대표 코치',
        ' · ',
        '전) 서울과학기술대학교 코치',
        '전) 블루코트배드민턴장 코치',
        '전) 바로배드민턴장 아카데미 코치',
        '전) 와우실내배드민턴장 야간 코치',
        '전) 엘리트 선수 개인 코치',
        '... 외 다수',
      ],
    },
    {
      title: '수상 이력',
      items: [
        '2023 코리아민턴사랑 프리미엄 리그 (4차) 준자강 우승',
        '2023 제7회 인제내린천배 오픈 준자강 우승',
        '2021 코리아민턴사랑 프리미엄 리그 (1차) 준자강 우승',
        '2021 제 19회 다이요컵 전국 대회 준자강 우승',
        '2021 잼TV 미니게임 준자강 우승',
        '2019 제2회 제이나이스코리아오픈 최강조 우승',
        '...외 다수',
      ],
    },
  ],
};

const yoon: Coach = {
  name: '윤재원',
  title: '레슨 경력 6년차 선수 출신 코치',
  sections: [
    {
      title: '레슨 이력',
      items: [
        '현) 블랙배드민턴센터 코치',
        '현) 리부트배드민턴센터 코치',
        ' · ',
        '전) 블루코트배드민턴장 코치',
        '전) 와우배드민턴센터 코치',
        '전) 더쎈배드민턴 아카데미 코치',
        '... 외 다수',
      ],
    },
    {
      title: '선수 경력',
      items: [
        '주니어 국가대표 후보선수',
        '중등부 가을철 단체전 2위',
        '고등부 가을철 단체전 1위',
        '고등부 학교대항전 혼합복식 3위',
        '대학부 학교대항전 단체전 3위',
        '대학부 학교대항전 혼합복식 3위',
        '... 외 다수',
      ],
    },
  ],
};

interface CoachProps {
  coach: Coach;
  thumbnailSrc: string;
  backgroundSrc: string;
  align: 'left' | 'right';
  open: boolean;
  clipPath?: string;
  onClick: () => void;
}
function Coach({
  coach,
  thumbnailSrc,
  backgroundSrc,
  align,
  open,
  clipPath,
  onClick,
}: CoachProps) {
  const [opacity, setOpacity] = useState(open ? '' : ' opacity-0');

  useEffect(() => {
    if (open) {
      setOpacity(' transition-opacity duration-300');
    } else {
      setOpacity(' transition-opacity duration-300 opacity-0');
    }
  }, [open]);

  return (
    <div
      className={
        'absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out bg-cover bg-center cursor-pointer ' +
        (align === 'left' ? 'text-left' : 'text-right')
      }
      style={{
        backgroundImage: `url(${src(backgroundSrc)})`,
        clipPath: clipPath,
      }}
      onClick={onClick}
    >
      <div
        className={`w-full h-full` + opacity}
        style={{
          background: `linear-gradient(${
            align === 'left' ? '75deg' : '-75deg'
          },rgba(0,0,0,0.9),rgba(0,0,0,0.3))`,
        }}
      />

      <div
        className={
          'absolute p-3 sm:p-6 top-0 w-full flex items-center gap-4' +
          (align === 'left' ? '' : ' flex-row-reverse')
        }
      >
        <div className="max-w-[12vw] aspect-square bg-white max-h-[48px] w-[48px] h-[48px] relative">
          <Image
            src={src(thumbnailSrc)}
            alt={coach.name}
            layout="fill"
            objectFit="cover"
            style={{
              objectPosition: 'top',
            }}
          />
        </div>
        <div className={'inline-block text-white' + opacity}>
          <h2 className="text-2xl font-bold tracking-wider">{coach.name}</h2>
          <span className="text-sm">{coach.title}</span>
        </div>
      </div>
      <div
        className={
          'absolute bottom-0 w-full p-4 sm:p-8 text-white whitespace-nowrap' +
          opacity
        }
      >
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

const openSans = Open_Sans({ subsets: ['latin'] });

export default function MainCoaches() {
  const [expandedSide, setExpandedSide] = useState('left');
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  const handleClick = (side: string) => {
    if (expandedSide === side) {
      if (side === 'left') {
        setLeftOpen((open) => !open);
      } else {
        setRightOpen((open) => !open);
      }
    }
    setExpandedSide(side);
  };

  return (
    <>
      <h1
        className={
          'ml-1 mt-12 mb-4 text-gray-700 text-center text-xl ' +
          openSans.className
        }
      >
        Main Coaches
      </h1>
      <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[560px] overflow-hidden">
        <Coach
          coach={an}
          thumbnailSrc="/antroke.jpg"
          backgroundSrc="/slide/1.jpeg"
          align="left"
          open={expandedSide === 'left' && leftOpen}
          onClick={() => handleClick('left')}
        />
        <Coach
          coach={yoon}
          thumbnailSrc="/yoon.jpeg"
          backgroundSrc="/slide/2.jpeg"
          align="right"
          open={expandedSide === 'right' && rightOpen}
          clipPath={
            expandedSide === 'left'
              ? 'polygon(80% 0, 100% 0, 100% 100%, 95% 100%)'
              : 'polygon(20% 0, 100% 0, 100% 100%, 5% 100%)'
          }
          onClick={() => handleClick('right')}
        />
      </div>
      <span className="block text-xs text-end mt-1 mr-2 text-gray-400">
        ※ 좌우 이미지를 클릭하세요
      </span>
    </>
  );
}
