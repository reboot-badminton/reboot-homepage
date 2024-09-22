import Link from 'next/link';
import ImageSlide from './components/ImageSlide';
import Members from './members';
import MainCoaches from './components/MainCoaches';
import Introduction from './components/Introduction';

const slideImages = Array.from({ length: 5 }, (_, index) => ({
  src: `/slide/${index}.jpeg`,
  alt: `blurred slide Image ${index}`,
}));

export default function Home() {
  return (
    <>
      <ImageSlide srcs={slideImages} />
      <div className="text-center m-5">
        <Link href="/slots" className="button">
          레슨보기
        </Link>
      </div>
      <hr />
      <Introduction />
      <MainCoaches />
      <Members />
    </>
  );
}
