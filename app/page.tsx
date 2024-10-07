import ImageSlide from '@/app/ImageSlide';
import Introduction from './Introduction';
import MainCoaches from './MainCoaches';
import Members from './members';

const slideImages = Array.from({ length: 4 }, (_, index) => ({
  src: `/slide/${index}.jpeg`,
  alt: `blurred slide Image ${index}`,
}));

export default function Home() {
  return (
    <>
      <ImageSlide srcs={slideImages}>
        <Introduction />
      </ImageSlide>
      <hr />
      <MainCoaches />
      <Members />
    </>
  );
}
