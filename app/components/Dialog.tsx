'use client';

import { PropsWithChildren, useEffect, useState } from 'react';

interface Props {
  text?: string;
  useDotAnimation?: boolean;
}

export default function Dialog({
  text,
  useDotAnimation,
  children,
}: PropsWithChildren<Props>) {
  const [dotCount, setDotCount] = useState(useDotAnimation ? 1 : 0);

  useEffect(() => {
    if (!useDotAnimation) return;

    const interval = setInterval(() => {
      setDotCount((c) => (c % 3) + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [useDotAnimation]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg">
        {text != null && (
          <div className="flex items-center p-6">
            {text}
            {new Array(dotCount).fill('.').join('')}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
