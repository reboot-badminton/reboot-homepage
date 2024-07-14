import Header from './components/Header';
import ImageSlide from './components/ImageSlide';

const slideImages = Array.from({ length: 19 }, (_, index) => ({
  src: `/slide/${index + 1}.jpg`,
  alt: `blurred slide Image ${index + 1}`
}));

export default function Home() {
  return (
    <>
      <Header />
      <ImageSlide srcs={slideImages} />
    </>
  );
}
