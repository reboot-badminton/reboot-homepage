'use client'

import Menu from '@/app/components/Menu';
import { useCallback } from 'react';

export default function RegistrationMenu({uid}: {uid: string}) {
    const banUser = useCallback(() => { }, [uid]);

    return <Menu items={[
        {
            text: '유저 밴',
            color: '#ef4444',
            onClick: banUser,
        },
    ]} />;
}
