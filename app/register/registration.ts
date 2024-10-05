import { UserData } from '@/firebase';
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
  data?: any;
  fixedValue?: (userData: UserData) => T | null;
}

export class Registration {
  times: Field<TimeSlot[]> = {
    name: '관심 레슨',
    value: [],
    isRequired: true,
    type: FieldType.TIME_SLOT,
  };
  name: Field<string> = {
    name: '이름',
    value: '',
    isRequired: true,
    type: FieldType.STRING,
    fixedValue: (userData) => userData.name,
  };
  gender: Field<string | null> = {
    name: '성별',
    value: null,
    isRequired: true,
    type: FieldType.OPTIONS,
    data: ['남자', '여자'],
    fixedValue: (userData) => userData.gender === 'male' ? '남자' : '여자',
  };
  birthday: Field<Date> = {
    name: '생년월일',
    value: new Date(),
    isRequired: true,
    type: FieldType.DATE,
    fixedValue: (userData) => new Date(userData.birthday),
  };
  phone: Field<string> = {
    name: '전화번호',
    value: '',
    isRequired: true,
    type: FieldType.PHONE,
    fixedValue: (userData) => userData.phone,
  };
  level: Field<string | null> = {
    name: '급수',
    value: null,
    isRequired: true,
    type: FieldType.OPTIONS,
    data: ['A', 'B', 'C', 'D', '초심', '입문'],
  };
  goal: Field<string | null> = {
    name: '목적',
    value: null,
    isRequired: true,
    type: FieldType.OPTIONS,
    data: ['실력 향상', '자세 교정', '대회 입상', '다이어트', '기타'],
  };
  others: Field<string> = {
    name: '하고 싶은 말',
    value: '',
    isRequired: false,
    type: FieldType.STRING,
  };
}
