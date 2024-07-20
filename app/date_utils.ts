import { Timestamp } from 'firebase/firestore';

export function formatDate(timestamp: Timestamp) {
  const date = timestamp.toDate();
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
