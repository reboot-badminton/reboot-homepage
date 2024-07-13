import Link from 'next/link';
import ImageSlide from './components/ImageSlide';

export default function Home() {
  return (
    <>
      <ImageSlide srcs={[]} />
      <div className="text-center m-5">
        <Link
          href="/lesson"
          className="py-2 px-4 bg-blue-300 rounded-lg text-white transition duration-300 ease-in-out hover:brightness-110"
        >
          레슨 신청하기
        </Link>
      </div>
    </>
  );
}
