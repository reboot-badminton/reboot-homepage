'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';

const days = '월화수목금토일'.split('');

interface Props {
  onDayChange: (day: number) => void;
}

export default function DaySelector({ onDayChange }: Props) {
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    onDayChange(selectedDay);
  }, [onDayChange, selectedDay]);

  return (
    <div className="flex items-end">
      {days.map((day, index) => (
        <React.Fragment key={'manage-slot-cotnainer-' + index}>
          {index > 0 && (
            <div
              className="w-0.5 bg-gray-300 h-5"
              key={'manage-slot-divider-' + index}
            />
          )}
          <div
            className={
              'flex-grow text-center py-1 cursor-pointer' +
              (index === selectedDay
                ? ' bg-white rounded-t-md text-blue-600'
                : ' border-b border-gray-400 hover:bg-white/40')
            }
            onClick={() => setSelectedDay(index)}
            key={'manage-slot-' + day}
          >
            {day}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
