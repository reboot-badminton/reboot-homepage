import { LessonMonth } from '@/app/data/LessonMonth';
import TimeSlot from '@/app/data/TimeSlot';
import { firestore } from '@/app/firebase/firebase';
import { doc, DocumentData, getDoc, setDoc } from 'firebase/firestore';

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

export async function updateSlot(newTimeSlot: TimeSlot, oldTimeSlot: TimeSlot) {
  const year = newTimeSlot.lessonMonth.year;
  const month = newTimeSlot.lessonMonth.month;
  if (
    year !== oldTimeSlot.lessonMonth.year ||
    month !== oldTimeSlot.lessonMonth.month
  ) {
    window.alert('슬롯의 월은 변경할 수 없습니다.');
    return;
  }

  const snapshot = await getDoc(doc(firestore, 'slots', year.toString()));

  const data: {
    [field: number]: TimeSlot[];
  } = {};
  if (snapshot.exists()) {
    const snapshotData: DocumentData = snapshot.data();

    data[month] = snapshotData[month].filter(
      (slot: TimeSlot) =>
        slot.lessonMonth.year !== year ||
        slot.lessonMonth.month !== month ||
        slot.days.join() !== oldTimeSlot.days.join() ||
        slot.time !== oldTimeSlot.time
    );
  }

  data[month] = [newTimeSlot].concat(...(data[month] ?? []));

  setDoc(doc(firestore, 'slots', year.toString()), data);
}
