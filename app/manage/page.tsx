import ManageButton from './ManageButton';

export default function Manage() {
  return (
    <div className="text-center py-4 px-2">
      <ManageButton href="/manage/slots" className="bg-green-300">레슨 슬롯 관리</ManageButton>
      <ManageButton href="/manage/registrations" className="bg-blue-300">레슨 신청 관리</ManageButton>
      <ManageButton href="/manage/users" className="bg-pink-300">유저 관리</ManageButton>
    </div>
  );
}
