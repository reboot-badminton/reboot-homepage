import Link from 'next/link';

export default function Manage() {
  return (
    <div className="text-center py-4 px-2">
      <Link
        href="/manage/slots"
        className="inline-block py-2 px-4 bg-green-300 rounded-lg text-white transition duration-300 ease-in-out hover:brightness-110"
      >
        레슨 슬롯 관리
      </Link>
    </div>
  );
}
