import { Role } from '@/firebase';
import RoleBadge from './RoleBadge';

interface Props {
  id: string;
  role?: Role;

  name?: string;
  gender?: string;
  birthday?: string;

  email: string;
  phone?: string;
}

function getAge(year: number): number {
  return new Date().getFullYear() - year + 1;
}

export default function UserItem(user: Props) {
  return (
    <div>
      <div className="text-lg flex items-center">
        <RoleBadge role={user.role ?? Role.NONE} />
        {user.name}
      </div>
      <div className="text-sm">
        {user.gender === 'male' ? '남' : '여'}
        &nbsp;/&nbsp;
        {user.birthday && <>
          {getAge(parseInt(user.birthday.split('-')[0]))}세 ({user.birthday})
        </>}
      </div>
      <div className="text-sm">
        <b>전화번호</b> {user.phone}
      </div>
      <div className="text-sm">
        <b>이메일</b> {user.email}
      </div>
    </div>
  );
}