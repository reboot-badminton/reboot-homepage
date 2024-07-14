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
}
