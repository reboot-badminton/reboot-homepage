import Link from 'next/link';
import ImageSlide from './components/ImageSlide';
import Introduction from './components/Introduction';
import MainCoaches from './components/MainCoaches';
import Members from './members';

const slideImages = Array.from({ length: 4 }, (_, index) => ({
  src: `/slide/${index + 1}.jpeg`,
  alt: `blurred slide Image ${index + 1}`,
}));

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <ImageSlide srcs={slideImages} />
      <div className="flex align-middle items-center gap-4 m-5">
        <Link href="/register" className="button">
          레슨 신청
        </Link>
      </div>
      <hr />
      <Introduction />
      <MainCoaches />
      <Members />
    </main>
  );
}
