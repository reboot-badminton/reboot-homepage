import Image from 'next/image';
import { src as imageSrc } from '../app/image_utils';

export interface ImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

// 이미지를 컨테이너 크기에 맞게 그려주고,
// 남는 공간은 같은 이미지를 블러 처리해서 보여주는 컴포넌트.
// 이미지를 두 번 그리는데,
// 1. 한 번은 이미지가 전체 공간을 다 덮게 그리고 블러 처리
// 2. 한 번은 이미지가 컨테이너 사이즈에 딱 맞게 그리기
export default function BlurredImage({ src, alt, priority }: ImageProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src={imageSrc(src)}
        alt={alt}
        fill
        priority={priority}
        className="blur-lg object-cover"
      />
      <Image
        src={imageSrc(src)}
        alt={alt}
        fill
        priority={priority}
        className="object-contain"
      />
    </div>
  );
}
