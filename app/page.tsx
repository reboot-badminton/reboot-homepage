import Header from './components/Header';
import ImageSlide from './components/ImageSlide';

const slideImages = Array.from({ length: 19 }, (_, index) => (index + 1).toString());

export default function Home() {
  return (
    <>
      <Header />
      <ImageSlide srcs={slideImages} />
    </>
  );
}
