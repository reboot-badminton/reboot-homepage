import ImageSlide from './components/ImageSlide';
import Introduction from './Introduction';
import MainCoaches from './MainCoaches';
import Members from './members';
import RegisterButton from './RegisterButton';

const slideImages = Array.from({ length: 5 }, (_, index) => ({
  src: `/slide/${index}.jpeg`,
  alt: `blurred slide Image ${index}`,
}));

export default function Home() {
  return (
    <>
      <ImageSlide srcs={slideImages} />
      <RegisterButton />
      <hr />
      <Introduction />
      <MainCoaches />
      <Members />
    </>
  );
}
