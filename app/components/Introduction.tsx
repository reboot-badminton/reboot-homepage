import Image from 'next/image';
import { src } from '../image_utils';

export default function Introduction() {
  return (
    <div className="flex justify-center w-full bg-white mt-8 py-4 sm:py-8 lg:py-12">
      <div className="max-w-xl flex">
        <Image
          src={src('/이용대_짤2.jpg')}
          width={150}
          height={400}
          alt="소개"
          priority
        />
        <div className="flex-grow flex flex-col justify-between mx-2 sm:mx-4 lg:mx-8">
          <h2>리부트 배드민턴장은...</h2>
          <p
            className="text-xs"
            style={{
              wordBreak: 'keep-all',
            }}
          >
            회원 한 분 한 분에게 맞춤형 레슨을 제공하는 것으로 유명합니다.
            이곳에서는 2명씩 1시간씩 진행되는 개인 레슨을 통해 회원들의 실력
            향상을 위해 최선을 다하고 있죠.
          </p>
          <div className="text-right">
            <div
              className="inline-block mr-2"
              style={{
                verticalAlign: 'middle',
              }}
            >
              <div className="text-xs">리부트 배드민턴장 대표</div>
              <span className="tracking-[0.3em]">안진욱</span>
            </div>
            <Image
              src={src('/signature.png')}
              width={50}
              height={50}
              alt="서명"
              className="inline-block"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
