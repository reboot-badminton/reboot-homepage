import { LessonMonth } from '@/app/data/LessonMonth';
import TimeSlot from '@/app/data/TimeSlot';

export function getSlot(slots: TimeSlot[], day: number, time: number) {
  return slots.find((slot) => slot.days.includes(day) && slot.time === time);
}

export function getSlotsForDay(slots: TimeSlot[], day: number) {
  return slots.filter((slot) => slot.days.includes(day));
}

export function getSlotsForMonth(lessonMonth: LessonMonth) {
  if (lessonMonth.year !== 2024 || lessonMonth.month !== 7) {
    return [];
  }

  return [
    // July 2024
    {
      lessonMonth: { year: 2024, month: 7 },
      days: [0, 2, 4],
      time: 0, // 12 AM
      title: '평일 월수금 (초급)',
      coach: '안진욱',
      price: 220000,
      capacity: 2,
      students: ['김현이'],
    },
    {
      lessonMonth: { year: 2024, month: 7 },
      days: [1, 3, 5],
      time: 15, // 3 PM
      title: '평일 화목토 (중급)',
      coach: '김민정',
      price: 250000,
      capacity: 5,
      students: ['이지혜', '박준영'],
    },
    {
      lessonMonth: { year: 2024, month: 7 },
      days: [6], // Sundays only
      time: 10, // 10 AM
      title: '주말반 (초급)',
      coach: '최승현',
      price: 280000,
      capacity: 8,
      students: ['강민수', '윤서연', '정수진'],
    },
    {
      lessonMonth: { year: 2024, month: 7 },
      days: [0, 2, 4], // Wednesdays and Fridays
      time: 18, // 6 PM
      title: '저녁반 (중급)',
      coach: '박지원',
      price: 240000,
      capacity: 6,
      students: [],
    },
  ];
}
