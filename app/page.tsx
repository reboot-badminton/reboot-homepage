import Link from 'next/link';
import ImageSlide from './components/ImageSlide';

const slideImages = Array.from({ length: 19 }, (_, index) => ({
  src: `/slide/${index + 1}.jpg`,
  alt: `blurred slide Image ${index + 1}`
}));

export default function Home() {
  return (
    <>
      <ImageSlide srcs={slideImages} />
      <div className="text-center m-5">
        <Link
          href="/register"
          className="py-2 px-4 bg-blue-300 rounded-lg text-white transition duration-300 ease-in-out hover:brightness-110"
        >
          레슨 신청하기
        </Link>
      </div>
    </>
  );
}