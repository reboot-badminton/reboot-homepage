import ImageSlide from '@/app/components/ImageSlide';
import Introduction from './components/Introduction';
import MainCoaches from './components/MainCoaches';
import Members from './components/Members';

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
