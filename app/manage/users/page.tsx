'use client';

import { firestore, toRoleFromString, UserData } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import UserItem from './UserItem';

export default function Manage() {
  const [users, setUsers] = useState<UserData[]>([]);

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
  });

  return (
    <div className="py-4 px-2">
      {users.map((userData) => {
        return (
          <React.Fragment key={userData.uid}>
            <UserItem userData={userData} />
            <hr className='m-4' />
          </React.Fragment>
        );
      })}
    </div>
  );
}
