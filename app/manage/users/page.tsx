import { firestore, toRole } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import UserItem from './UserItem';
import React from 'react';

export default async function Manage() {
  const snapshot = (await getDocs(collection(firestore, 'users')));

  console.log('run');

  return (
    <div className="py-4 px-2">
      {snapshot.docs.map((doc) => {
        const data = doc.data();
        return (
          <React.Fragment key={doc.id}>
            <UserItem
              id={doc.id}
              role={toRole(data.role)}
              name={data.name}
              gender={data.gender}
              birthday={data.birthday}
              email={data.email}
              phone={data.phone} />
            <hr
              className='m-4' />
          </React.Fragment>
        );
      })}
    </div>
  );
}
