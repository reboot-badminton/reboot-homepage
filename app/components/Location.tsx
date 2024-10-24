import NaverMap from './NaverMap';

const distanceInfo = [
  {
    transport: '지하철',
    number: '4호선',
    location: '오남역, 별내별가람역, 진접역',
  },
  {
    transport: '버스',
    number: '떙큐70, 100, 9, 23, 202, 9-1, 10',
    location: '독정리 하차',
  },
  {
    transport: '차량',
    number: '승용차, 택시',
    location: '진건오남로390번길 89',
  },
];

function Location() {
  return (
    <div className="px-12 mb-12">
      <h1 className="ml-1 mt-12 mb-4 text-gray-800 text-xl font-bold flex items-center gap-3">
        <div className="w-1 h-8 bg-blue-300"></div> 오시는 길
      </h1>
      <div className="flex flex-row mobile:flex-col items-start mobile:justify-center gap-6">
        <div className="w-full h-64 mobile:h-auto">
          <NaverMap />
        </div>
        <div className="w-full text-gray-700 leading-relaxed space-y-4">
          <div className="mb-8">
            <h2 className="flex items-center gap-3 text-xl font-semibold mb-3 whitespace-nowrap">
              리부트 배드민턴 전용구장
            </h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-[72px] mr-3 flex flex-row flex-nowrap justify-between items-center *:font-bold *:text-nowrap">
                  <div>주</div>
                  <div>소 :</div>
                </div>
                <span>경기 남양주시 진건읍 진건오남로390번길 89 1층</span>
              </div>
              <div className="flex items-center">
                <div className="w-[72px] mr-3 flex flex-row flex-nowrap justify-between items-center *:font-bold *:text-nowrap">
                  <div>T</div>
                  <div>E</div>
                  <div>L :</div>
                </div>
                <span>0507-1386-3720</span>
              </div>
              <div className="flex items-center">
                <div className="w-[72px] mr-3 flex flex-row flex-nowrap justify-between items-center *:font-bold *:text-nowrap">
                  <div>P</div>
                  <div>h</div>
                  <div>o</div>
                  <div>n</div>
                  <div>e :</div>
                </div>
                <span>010-3105-6212</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3">이동수단별 안내</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="*:text-center">
                    <th className="px-4 py-2 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                      종류
                    </th>
                    <th className="px-4 py-2 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                      호선
                    </th>
                    <th className="px-4 py-2 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                      도착 위치
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {distanceInfo.map((info, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    >
                      <td className="px-4 py-2 text-center border-b border-gray-200 text-sm text-gray-700 whitespace-nowrap">
                        {info.transport}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                        {info.number}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                        {info.location}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Location;
