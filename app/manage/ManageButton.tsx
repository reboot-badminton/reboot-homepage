import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface Props {
  href: string;
  className?: string;
}

export default function ManageButton({ href, className, children }: PropsWithChildren<Props>) {
  return (
    <Link
      href={href}
      className={`inline-block py-3 px-4 my-1 rounded-lg text-white transition duration-300 ease-in-out hover:brightness-110 w-full ${className}`}
    >
      {children}
    </Link>
  );
}
