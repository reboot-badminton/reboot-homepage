import TimeSlot from '../data/TimeSlot';

export interface Field<T> {
  name: string;
  value: T;
  isRequired: boolean;
}

export class Registration {
  times = {
    name: '시간대',
    value: <TimeSlot[]>[],
    isRequired: true,
  };
  name = {
    name: '이름',
    value: '',
    isRequired: true,
  };
  birthday = {
    name: '생년월일',
    value: new Date(),
    isRequired: true,
  };
  phone = {
    name: '전화번호',
    value: '',
    isRequired: true,
  };
}
