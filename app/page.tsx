import Header from './components/Header';
import ImageSlide from './components/ImageSlide';

export default function Home() {
  return (
    <>
      <Header />
      <ImageSlide srcs={[]} />
      <div className="text-center m-3">
        <button className="py-2 px-4 bg-blue-300 rounded-lg text-white transition duration-300 ease-in-out hover:brightness-110">
          레슨 신청하기
        </button>
      </div>
    </>
  );
}
