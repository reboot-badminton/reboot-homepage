'use client'

import Menu from '@/components/Menu';
import { firestore, Role, toRoleString } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function RegistrationMenu({ uid }: { uid: string }) {
  const router = useRouter();

  const banUser = useCallback(async () => {
    await updateDoc(doc(firestore, 'users', uid), { role: toRoleString(Role.BANNED) });
    router.refresh();
  }, [uid]);

  return <Menu items={[
    {
      text: '유저 밴',
      color: '#ef4444',
      onClick: banUser,
    },
  ]} />;
}
