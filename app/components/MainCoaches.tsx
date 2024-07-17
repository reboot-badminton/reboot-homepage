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
    ? "polygon(0 0, 80% 0, 100% 100%, 0 100%)"
    : "polygon(0 0, 20% 0, 10% 100%, 0 100%)";

  const rightClipPath = isLeftExpanded
    ? "polygon(80% 0, 100% 0, 100% 100%, 90% 100%)"
    : "polygon(20% 0, 100% 0, 100% 100%, 10% 100%)";

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out bg-cover bg-center cursor-pointer "
        style={{
          backgroundImage: `url(${src('/slide/1.jpeg')})`,
          clipPath: leftClipPath,
        }}
        onClick={() => handleClick("left")}
      >
        <div className="absolute top-2 left-2"><Image src={src('/antroke.jpg')} alt="an" width={48} height={48}/></div>
        {isLeftExpanded&&(<div className="absolute bottom-4 left-4 w-1/2 text-white">
          <h2 className="text-2xl font-bold mb-2 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">안트로크 코치</h2>
          <p className="[text-shadow:_1px_2px_1px_rgb(0_0_0_/_50%)]">안트로크 코치에 대한 설명을 여기에 추가하세요.</p>
          <p className="[text-shadow:_1px_2px_1px_rgb(0_0_0_/_50%)]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla dolorem, provident veritatis quos, nesciunt, officia explicabo consequuntur doloribus eaque saepe quidem! Accusamus, culpa? Molestiae soluta veniam earum, ullam adipisci ratione.</p>
        </div>)}
      </div>
      <div
        className="absolute top-0 right-0 w-full h-full transition-all duration-300 ease-in-out bg-cover bg-center cursor-pointer"
        style={{
          backgroundImage: `url(${src('/slide/2.jpeg')})`,
          clipPath: rightClipPath,
        }}
        onClick={() => handleClick("right")}
      >
        <div className="absolute top-2 right-2 backdrop-blur-sm"><Image src={src('/reboot-icon.png')} alt="yoon" width={48} height={48}/></div>
       {!isLeftExpanded&&( <div className="absolute bottom-4 right-4 w-1/2 text-white">
          <h2 className="text-2xl font-bold mb-2 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">윤 코치</h2>
          <p className="">윤 코치에 대한 설명을 여기에 추가하세요.</p>
          <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla dolorem, provident veritatis quos, nesciunt, officia explicabo consequuntur doloribus eaque saepe quidem! Accusamus, culpa? Molestiae soluta veniam earum, ullam adipisci ratione.</p>
        </div>)}
      </div>
    </div>
  );
}
