import { PropsWithChildren } from 'react';
import Authorized from '../../components/Authorized';
import { Role } from '@/firebase';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Authorized allowedRoles={[Role.ADMIN, Role.MANAGER]}>
      {children}
    </Authorized>
  );
}