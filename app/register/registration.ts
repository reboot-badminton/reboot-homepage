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
  level = {
    name: '급수',
    value: null,
    isRequired: true,
    type: FieldType.OPTIONS,
    data: ['A', 'B', 'C', 'D', '초심', '입문'],
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
  goal = {
    name: '목적',
    value: null,
    isRequired: true,
    type: FieldType.OPTIONS,
    data: ['실력 향상', '자세 교정', '대회 입상', '다이어트', '기타'],
  };
  others = {
    name: '하고 싶은 말',
    value: '',
    isRequired: false,
    type: FieldType.STRING,
  };
}
