import Link from 'next/link';
import ImageSlide from './components/ImageSlide';
import Members from './members';

const slideImages = Array.from({ length: 4 }, (_, index) => ({
  src: `/slide/${index + 1}.jpeg`,
  alt: `blurred slide Image ${index + 1}`,
}));

export default function Home() {
  return (
    <>
      <ImageSlide srcs={slideImages} />
      <div className="text-center m-5">
        <Link href="/register" className="button">
          레슨 신청하기
        </Link>
      </div>
      <hr />
      <Members />
    </>
  );
}
