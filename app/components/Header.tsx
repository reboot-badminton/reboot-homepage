import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <Link href="/" className="flex justify-center items-center py-2 bg-white">
      <Image
        className="mr-2"
        src="/antroke.jpg"
        alt="리부트 배드민턴장 로고"
        width={50}
        height={50}
        priority
      />
      리부트 배드민턴 전용구장
    </Link>
  );
}
