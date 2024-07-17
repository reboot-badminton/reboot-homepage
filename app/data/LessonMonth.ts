export interface LessonMonth {
  year: number;
  month: number;
}

export function currentLessonMonth(): LessonMonth {
  const date = new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
}

export function nextLessonMonth(lessonMonth: LessonMonth): LessonMonth {
  const month = lessonMonth.month + 1;
  if (month > 12) {
    return {
      year: lessonMonth.year + 1,
      month: month - 12,
    };
  }

  return {
    year: lessonMonth.year,
    month,
  };
}

export function prevLessonMonth(lessonMonth: LessonMonth): LessonMonth {
  const month = lessonMonth.month - 1;
  if (month < 1) {
    return {
      year: lessonMonth.year - 1,
      month: month + 12,
    };
  }

  return {
    year: lessonMonth.year,
    month,
  };
}
