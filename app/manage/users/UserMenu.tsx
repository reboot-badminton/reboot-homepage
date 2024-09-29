'use client';

import Menu from '@/app/components/Menu';

export default function UserMenu({ uid }: { uid: string }) {
  return (
    <Menu items={[
      { text: '관리자 임명', onClick: () => { } },
      { text: '유저 밴', color: '#ef4444', onClick: () => { } },
    ]} />
  );
}
