export function formatHour(hour: number) {
  const ampm = hour >= 12 ? '오후' : '오전';

  hour %= 12;
  if (hour === 0) hour = 12;

  return `${ampm} ${hour}시`;
}
