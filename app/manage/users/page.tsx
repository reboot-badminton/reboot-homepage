'use client';

import { firestore, Role, toRoleFromString, UserData } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import UserItem from './UserItem';

export default function Manage() {
  const [users, setUsers] = useState<UserData[]>([]);

  const onUserRoleChange = useCallback((userIndex: number, newRole: Role) => {
    const updatedUser: UserData = {
      ...users[userIndex],
      role: newRole,
    };
    setUsers(users => [
      ...users.slice(0, userIndex),
      updatedUser,
      ...users.slice(userIndex + 1)]);
  }, [users]);

  useEffect(() => {
    getDocs(collection(firestore, 'users')).then((snapshot) => {
      const userDataList = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          uid: doc.id,
          name: data.name,
          role: toRoleFromString(data.role),
          gender: data.gender,
          birthday: data.birthday,
          email: data.email,
          phone: data.phone,
        };
      });
      setUsers(userDataList);
    });
  }, [setUsers]);

  return (
    <div className="py-4 px-2">
      {users.map((userData, i) => {
        return (
          <React.Fragment key={userData.uid}>
            <UserItem
              userData={userData}
              onUserRoleChange={(newRole) => onUserRoleChange(i, newRole)} />
            <hr className='m-4' />
          </React.Fragment>
        );
      })}
    </div>
  );
}
