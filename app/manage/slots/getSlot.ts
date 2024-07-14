import { LessonMonth } from '@/app/data/LessonMonth';
import TimeSlot from '@/app/data/TimeSlot';
import { firestore } from '@/app/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

export function getSlot(slots: TimeSlot[], day: number, time: number) {
  return slots.find((slot) => slot.days.includes(day) && slot.time === time);
}

export function getSlotsForDay(slots: TimeSlot[], day: number) {
  return slots.filter((slot) => slot.days.includes(day));
}

export async function getSlotsForMonth(lessonMonth: LessonMonth) {
  const snapshot = await getDoc(
    doc(firestore, 'slots', lessonMonth.year.toString())
  );
  if (!snapshot.exists()) {
    return [];
  }

  return snapshot.data()[lessonMonth.month] ?? [];
}
