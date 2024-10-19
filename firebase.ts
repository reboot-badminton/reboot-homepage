import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { clientConfig } from './config';

export enum Role {
  ADMIN,
  MANAGER,
  MEMBER,
  NONE,
  BANNED,
}

export function toRoleString(role: Role): string {
  return Role[role].toLowerCase();
}

export function toRoleFromString(role: string): Role {
  switch (role) {
    case 'manager':
      return Role.MANAGER;
    case 'admin':
      return Role.ADMIN;
    case 'member':
      return Role.MEMBER;
    default:
      return Role.NONE;
    case 'banned':
      return Role.BANNED;
  }
}

export interface UserData {
  uid: string;

  name: string;
  role: Role;

  gender: string;
  birthday: string;

  email: string;
  phone: string;
}

export async function getUserData() {
  const user = getAuth().currentUser;
  if (user == null) return null;

  const result = await getDoc(doc(firestore, 'users', user.uid));
  if (!result.exists()) return null;

  const rawUserData = result.data();
  return {
    uid: user.uid,
    name: rawUserData.name,
    role: toRoleFromString(rawUserData.role),
    gender: rawUserData.gender,
    birthday: rawUserData.birthday,
    email: rawUserData.email,
    phone: rawUserData.phone,
  };
}

export async function getRole() {
  const user = getAuth().currentUser;
  if (user == null) return Role.NONE;

  const result = await getDoc(doc(firestore, 'users', user.uid));
  if (!result.exists()) return Role.NONE;

  return toRoleFromString(result.data()?.role);
}

console.log(clientConfig);
export const app = initializeApp(clientConfig);
export const firestore = getFirestore(app);
