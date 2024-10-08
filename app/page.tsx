import ImageSlide from '@/app/components/ImageSlide';
import Introduction from './components/Introduction';
import MainCoaches from './components/MainCoaches';
import Members from './components/Members';
import { Metadata } from 'next';

export const metadata: Metadata = {
  other: {
    'naver-site-verification': '7afbf4c1c8db9d882054d33685a1e4454790e526',
  },
};

const slideImages = Array.from({ length: 4 }, (_, index) => ({
  src: `/slide/${index}.webp`,
  alt: `blurred slide Image ${index}`,
}));

export default function Home() {
  return (
    <div className={`-mt-[61px]`}>
      <ImageSlide srcs={slideImages}>
        <Introduction />
      </ImageSlide>
      <hr />
      <MainCoaches />
      <Members />
    </div>
  );
}
