'use client';

import Image, { ImageProps } from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  src: ImageProps;
  onFadeEnd: () => void;
}

export default function ImageFadeIn({ src, onFadeEnd }: Props) {
  const [back, setBack] = useState(src);
  const [front, setFront] = useState(src);

  const [isFading, setIsFading] = useState(false);
  const nextImageRef = useRef<HTMLImageElement>(null);

  const onTransitionEnd = useCallback(() => {
    setBack(front);
    setIsFading(false);
    onFadeEnd();
  }, [front, setBack, setIsFading, onFadeEnd]);

  useEffect(() => {
    setFront(src);
    setIsFading(true);
  }, [front, src]);

  return (
    <>
      <Image
        src={back.src}
        alt={back.alt}
        fill={true}
        className='object-cover object-center opacity-100'
        priority
      />
      <Image
        ref={nextImageRef}
        src={front.src}
        alt={front.alt}
        fill={true}
        onTransitionEnd={onTransitionEnd}
        className={'object-cover object-center transition-opacity' + (isFading ? ' duration-500 opacity-100' : ' opacity-0')}
      />
    </>
  );
}