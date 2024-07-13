'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const headers = ['', '월', '화', '수', '목', '금', '토', '일'];
const startTime = 6; // Starting hour (6:00 AM)
const endTime = 23; // Ending hour (11:00 PM)

const timeSlots = Array.from(
  { length: endTime - startTime + 1 },
  (_, index) => {
    const hour = startTime + index;
    return `${hour <= 12 ? hour : hour - 12}시`;
  }
);

export default function Lesson() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const q = searchParams.get('q');

  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<number>();

  useEffect(() => {
    if (q == null || q === '') {
      router.replace(pathname + '?q=2024-08');
      return;
    }

    const [y, m] = q.split('-').map((t) => Number(t));
    setYear(y);
    setMonth(m);
  }, [q]);

  return (
    <>
      <div className="text-center m-2">
        {year}년 {month}월 레슨 현황
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((timeSlot, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex === 6 ? 'border-t-8 border-gray-100' : ''}
            >
              <td className="border px-1 py-2 text-right text-xs">
                {timeSlot}
              </td>
              {[...Array(7)].map((_, colIndex) => (
                <td key={colIndex} className="border px-4 py-2 text-center">
                  {/* You would put your cell data here */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
