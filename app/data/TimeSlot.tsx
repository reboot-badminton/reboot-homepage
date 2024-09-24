import { LessonMonth } from './LessonMonth';

export default interface TimeSlot {
  lessonMonth: LessonMonth;
  days: number[];
  time: number;

  title: string;
  coach: string;
  price: number;

  capacity: number;
  students: string[];

  isRegistered?: boolean;
}

export function isSameSlot(slot1: TimeSlot, slot2: TimeSlot) {
  return (
    slot1.lessonMonth.year === slot2.lessonMonth.year &&
    slot1.lessonMonth.month === slot2.lessonMonth.month &&
    slot1.days === slot2.days &&
    slot1.time === slot2.time
  );
}
