import { LessonMonth } from './LessonMonth';

export default interface TimeSlot {
  lessonMonth: LessonMonth;
  days: number[];
  time: number;  // hour
  duration: number;  // hour

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
    slot1.time === slot2.time &&
    slot1.duration === slot2.duration &&
    slot1.title === slot2.title &&
    slot1.coach === slot2.coach &&
    slot1.price === slot2.price &&
    slot1.capacity === slot2.capacity
  );
}
