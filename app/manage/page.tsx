import Link from 'next/link';
import AccessControl from './AccessControl';
import { Role } from '@/firebase';

export default function Manage() {
  return (
    <AccessControl allowedRoles={[Role.ADMIN, Role.MANAGER]}>
      <div className="text-center py-4 px-2">
        <Link
          href="/manage/slots"
          className="inline-block py-2 px-4 bg-green-300 rounded-lg text-white transition duration-300 ease-in-out hover:brightness-110"
        >
          레슨 슬롯 관리
        </Link>
        <Link
          href="/manage/registrations"
          className="inline-block py-2 px-4 bg-blue-300 rounded-lg text-white transition duration-300 ease-in-out hover:brightness-110"
        >
          레슨 신청 관리
        </Link>
      </div>
    </AccessControl>
  );
}
