'use client';

import { Open_Sans } from 'next/font/google';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { src } from '../../utils/image_utils';

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
  onClick,
}: CoachProps) {
  const [opacity, setOpacity] = useState(open ? '' : ' not-desktop:opacity-0');

  useEffect(() => {
    if (open) {
      setOpacity(' transition-opacity duration-300');
    } else {
      setOpacity(' transition-opacity duration-300 not-desktop:opacity-0');
    }
  }, [open]);

  return (
    <div
      className={
        'bg-cover bg-center'
        + ' not-desktop:absolute not-desktop:top-0 not-desktop:left-0 not-desktop:w-full not-desktop:h-full not-desktop:transition-all not-desktop:duration-300 not-desktop:ease-in-out not-desktop:cursor-pointer'
        + (align === 'left' ? ' text-left' : ' text-right')
        + (align === 'right' ? (open ? ' not-desktop:main-coach-right-clip-path-open' : ' not-desktop:main-coach-right-clip-path-close') : '')
      }
      style={{
        backgroundImage: `url(${src(backgroundSrc)})`,
      }}
      onClick={onClick}
    >
      <div
        className={`w-full h-full` + opacity}
        style={{
          background: `linear-gradient(${align === 'left' ? '75deg' : '-75deg'
            },rgba(0,0,0,0.9),rgba(0,0,0,0.3))`,
        }}
      />

      <div className={'flex flex-col justify-between'
        + ' absolute mobile:inset-4 tablet:inset-8 desktop:inset-16'}>
        <div
          className={'w-full flex gap-4' + (align === 'left' ? '' : ' flex-row-reverse')}
        >
          <div className="w-[48px] h-[48px] desktop:w-[64px] desktop:h-[64px] relative">
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
            <h2 className="text-2xl desktop:text-3xl font-bold tracking-wider">{coach.name}</h2>
            <span className="block not-desktop:text-sm desktop:pt-2">{coach.title}</span>
          </div>
        </div>
        <div className={'w-full text-white whitespace-nowrap' + opacity}>
          {coach.sections.map((section) => (
            <React.Fragment key={coach.name + '-' + section.title}>
              <h3 className="mobile:text-sm mt-4 mb-2 bold">{section.title}</h3>
              <ul className="leading-relaxed desktop:leading-loose mobile:text-xs tablet:text-sm">
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
    </div>
  );
}

const openSans = Open_Sans({ subsets: ['latin'] });

export default function MainCoaches() {
  const [expandedSide, setExpandedSide] = useState('left');

  return (
    <>
      <div className="relative not-desktop:w-full desktop:mx-auto desktop:container mt-24 mobile:h-[480px] tablet:h-[540px] desktop:h-[800px] desktop:grid desktop:grid-cols-2 desktop:gap-8 overflow-hidden">
        <Coach
          coach={an}
          thumbnailSrc="/antroke.jpg"
          backgroundSrc="/slide/1.webp"
          align="left"
          open={expandedSide === 'left'}
          onClick={() => setExpandedSide('left')}
        />
        <Coach
          coach={yoon}
          thumbnailSrc="/yoon.jpeg"
          backgroundSrc="/slide/2.webp"
          align="right"
          open={expandedSide === 'right'}
          onClick={() => setExpandedSide('right')}
        />
      </div>
      <span className="block text-xs text-end mt-1 mr-2 text-gray-400 desktop:hidden">
        ※ 좌우 이미지를 클릭하세요
      </span>
    </>
  );
}
