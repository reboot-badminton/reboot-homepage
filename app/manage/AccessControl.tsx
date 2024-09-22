'use client';

import { ReactNode, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Dialog from '../components/Dialog';
import { getRole } from '@/firebase';

export default function AccessControl({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      const role = await getRole();

      if (role !== 'admin' && role !== 'manager') {
        router.push('/');
        return;
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <Dialog text="Loading" useDotAnimation={true} />;
  }

  return <>{children}</>;
}
