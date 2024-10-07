import RegisterButton from './RegisterButton';

export default function Introduction() {
  return (
    <section className="flex flex-col justify-between text-white mobile:text-center absolute top-[15%] left-1/2 bottom-0 -translate-x-1/2">
      <div>
        <h2 className="text-2xl desktop:text-4xl">리부트 배드민턴장은</h2>
        <p className="mt-4 text-3xl desktop:text-5xl whitespace-nowrap font-bold">
          프리미엄 맞춤 레슨을 <br className="tablet:hidden desktop:hidden" />제공합니다.
        </p>
        <hr className="w-8 desktop:w-1/3 h-1 my-4 desktop:my-8 mx-auto bg-white" />
        <span className="text-center desktop:text-xl">남양주 최고의 배드민턴 레슨 시설</span>
      </div>
      <div className="relative mx-auto">
        <RegisterButton />
      </div>
    </section>
  );
}
