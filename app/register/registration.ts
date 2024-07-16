import TimeSlot from '../data/TimeSlot';

export enum FieldType {
  TIME_SLOT,
  STRING,
  OPTIONS,
  DATE,
  PHONE,
}

export interface Field<T> {
  name: string;
  value: T;
  isRequired: boolean;
  type: FieldType;
  data: any;
}

export class Registration {
  times = {
    name: '시간대',
    value: <TimeSlot[]>[],
    isRequired: true,
    type: FieldType.TIME_SLOT,
  };
  name = {
    name: '이름',
    value: '',
    isRequired: true,
    type: FieldType.STRING,
  };
  gender = {
    name: '성별',
    value: null,
    isRequired: true,
    type: FieldType.OPTIONS,
    data: ['남자', '여자'],
  };
  birthday = {
    name: '생년월일',
    value: new Date(),
    isRequired: true,
    type: FieldType.DATE,
  };
  phone = {
    name: '전화번호',
    value: '',
    isRequired: true,
    type: FieldType.PHONE,
  };
}
