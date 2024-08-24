'use client';

import { ReactNode, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Dialog from '../components/Dialog';
import { getRole } from '../firebase/firebase';

function AccessControl({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/');
        return;
      }

      const role = await getRole();

      if (role === 'admin' || role === 'manager') {
        setHasAccess(true);
      } else {
        router.push('/');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <Dialog text="Loading" useDotAnimation={true} />;
  }

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
}

export default AccessControl;
