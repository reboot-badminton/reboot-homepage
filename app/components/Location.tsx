import NaverMap from './NaverMap';

function Location() {
  return (
    <>
      <h1 className="ml-1 mt-12 mb-4 text-gray-700 text-center text-xl">
        오시는 길
      </h1>
      <div className="px-12 flex flex-row items-start md:justify-center gap-6">
        <NaverMap />
        <div className="w-full md:w-1/2 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-semibold mb-4">
            리부트 배드민턴 전용구장
          </h2>
          <p className="mb-2 flex items-center">
            <strong>주소 : </strong> 경기 남양주시 진건읍 진건오남로390번길 89
            1층
          </p>
          <p className="mb-4 flex items-center">
            <strong>TEL : </strong> 0507-1386-3720
          </p>
          <p className="mb-4 flex items-center">
            <strong>Phone : </strong> 010-3105-6212
          </p>
          <h2 className="text-xl font-semibold mb-4">위치별 거리 안내</h2>
          <p className="mb-2">별내별가람역 차량 10분</p>
          <p className="mb-2">오남역 차량 10분</p>
          <p className="mb-2">진접역 13분</p>
          <p className="mb-2">진건고 3분</p>
          <p className="mb-2">노원구 28분</p>
          <p className="mb-2">도봉구 30분</p>
        </div>
      </div>
    </>
  );
}

export default Location;
