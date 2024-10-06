import { Role, UserData } from '@/firebase';
import RoleBadge from './RoleBadge';
import UserMenu from './UserMenu';

interface Props {
  userData: UserData;
}

function getAge(year: number): number {
  return new Date().getFullYear() - year + 1;
}

export default function UserItem({ userData }: Props) {
  return (
    <div>
      <div className="text-lg flex items-center justify-between">
        <div>
          <RoleBadge role={userData.role ?? Role.NONE} />
          {userData.name}
        </div>
        <UserMenu uid={userData.uid} role={userData.role} />
      </div>
      <div className="text-sm">
        {userData.gender === 'male' ? '남' : '여'}
        &nbsp;/&nbsp;
        {userData.birthday && <>
          {getAge(parseInt(userData.birthday.split('-')[0]))}세 ({userData.birthday})
        </>}
      </div>
      <div className="text-sm">
        <b>전화번호</b> {userData.phone}
      </div>
      <div className="text-sm">
        <b>이메일</b> {userData.email}
      </div>
    </div>
  );
}