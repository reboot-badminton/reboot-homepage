'use client';

import {
  LessonMonth,
  nextLessonMonth,
  prevLessonMonth,
} from '@/app/data/LessonMonth';
import { useEffect, useState } from 'react';

interface Props {
  onLessonMonthChange: (lessonMonth: LessonMonth) => void;
}

export default function MonthSelector({ onLessonMonthChange }: Props) {
  const [lessonMonth, setLessonMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  useEffect(() => {
    onLessonMonthChange(lessonMonth);
  }, [onLessonMonthChange, lessonMonth]);

  return (
    <nav>
      <button onClick={() => setLessonMonth((m) => prevLessonMonth(m))}>
        ◀
      </button>
      <span className="mx-3">
        {lessonMonth.year}년 {lessonMonth.month}월
      </span>
      <button onClick={() => setLessonMonth((m) => nextLessonMonth(m))}>
        ▶
      </button>
    </nav>
  );
}
