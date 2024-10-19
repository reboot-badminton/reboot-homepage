'use client';

import { useEffect } from 'react';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { app } from '@/firebase';

function Analytics() {
  useEffect(() => {
    async function initializeAnalytics() {
      const supported = await isSupported();
      if (supported) {
        getAnalytics(app);
      } else {
        console.log('Firebase Analytics is not supported in this environment.');
      }
    }

    initializeAnalytics();
  }, []);

  return null;
}

export default Analytics;
