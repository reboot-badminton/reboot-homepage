import BlurredImage from './BlurredImage';

interface Props {
  srcs: string[];
}

// 여러 개의 이미지를 슬라이드 형식으로 보여주는 컴포넌트
// 좌우 화살표와 인디케이터 표시
// 화살표와 인디케이터로 이미지 간 이동 가능
// 인디케이터는 총 몇 개의 이미지가 있고, 지금 몇 번째 이미지인지 알 수 있게끔 표시
// 일정 시간이 지날때마다 다음 이미지로 이동
export default function ImageSlide({ srcs }: Props) {
  return (
    <div className="w-full h-80 relative">
      <BlurredImage src='/antroke.jpg' />
    </div>
  );
}
