import Image from 'next/image';

interface Props {
  src: string;
}

// 이미지를 컨테이너 크기에 맞게 그려주고,
// 남는 공간은 같은 이미지를 블러 처리해서 보여주는 컴포넌트.
// 이미지를 두 번 그리는데,
// 1. 한 번은 이미지가 전체 공간을 다 덮게 그리고 블러 처리
// 2. 한 번은 이미지가 컨테이너 사이즈에 딱 맞게 그리기
export default function BlurredImage({ src }: Props) {
  return (
    <div>
      <Image
        src="/antroke.jpg"
        alt="리부트 배드민턴장 로고"
        layout="fill"
        objectFit="contain"
        priority
      />
    </div>
  );
}
