'use client';

import Menu, { MenuItem } from '@/components/Menu';
import { firestore, Role, toRoleString } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  uid: string;
  role: Role;
  onUserRoleChange: (newRole: Role) => void;
}

export default function UserMenu({ uid, role, onUserRoleChange }: Props) {
  const updateRole = useCallback(async (role: Role) => {
    await updateDoc(doc(firestore, 'users', uid), { role: toRoleString(role) });
    onUserRoleChange(role);
  }, [uid]);

  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const newItems: MenuItem[] = [];

    switch (role) {
      case Role.MANAGER:
        newItems.push({
          text: '관리자 해제',
          onClick: () => updateRole(Role.MEMBER),
        });
        break;
      case Role.MEMBER:
        newItems.push({
          text: '관리자 임명',
          onClick: () => updateRole(Role.MANAGER),
        });
        break;
    }

    if (role === Role.BANNED) {
      newItems.push({
        text: '밴 해제',
        color: '#ef4444',
        onClick: () => updateRole(Role.MEMBER),
      });
    } else if (role !== Role.ADMIN) {
      newItems.push({
        text: '유저 밴',
        color: '#ef4444',
        onClick: () => updateRole(Role.BANNED),
      });
    }

    setItems(newItems);
  }, [role]);

  return (
    <Menu items={items} />
  );
}
