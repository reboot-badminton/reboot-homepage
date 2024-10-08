import { PropsWithChildren } from 'react';

interface Props {
  title: string;
}

export default function AuthLayout({ title, children }: PropsWithChildren<Props>) {
  return (
    <main className="flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-[420px] bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            {title}
          </h1>
          <div className="space-y-4 md:space-y-6">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
