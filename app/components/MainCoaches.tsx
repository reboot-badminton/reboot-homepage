'use client';

import Image from 'next/image';
import { useState } from 'react';
import { src } from '../image_utils';

export default function MainCoaches() {
  const [isLeftExpanded, setIsLeftExpanded] = useState(true);

  const handleClick = (side: string) => {
    setIsLeftExpanded(side == "left");
  };

  const leftClipPath = isLeftExpanded
    ? "polygon(0 0, 100% 0, 80% 100%, 0 100%)"
    : "polygon(0 0, 20% 0, 10% 100%, 0 100%)";

  const rightClipPath = isLeftExpanded
    ? "polygon(80% 0, 100% 0, 100% 100%, 90% 100%)"
    : "polygon(20% 0, 100% 0, 100% 100%, 10% 100%)";

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out bg-cover bg-center"
        style={{
          backgroundImage: `url(${src('/slide/1.jpeg')})`,
          clipPath: leftClipPath,
        }}
        onClick={() => handleClick("left")}
      >
        <div className="absolute top-2 left-2"><Image src={src('/antroke.jpg')} alt="an" width={48} height={48}/></div>
      </div>
      <div
        className="absolute top-0 right-0 w-full h-full transition-all duration-300 ease-in-out bg-cover bg-center"
        style={{
          backgroundImage: `url(${src('/slide/2.jpeg')})`,
          clipPath: rightClipPath,
        }}
        onClick={() => handleClick("right")}
      >
        <div className="absolute top-2 right-2"><Image src={src('/reboot-icon.png')} alt="yoon" width={48} height={48}/></div>
      </div>
    </div>
  );
}
