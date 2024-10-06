import Image from 'next/image';
import Link from 'next/link';
import { src } from './image_utils';
import { Do_Hyeon } from 'next/font/google';

const doHyeon = Do_Hyeon({ weight: '400', subsets: ['latin'] });

export default function Header() {
  return (
    <Link href="/" className="flex justify-center items-center py-2 bg-white">
      <div className="text-center relative">
        <Image
          className="mr-2 rounded-full absolute -left-9 mt-1"
          src={src('/reboot-icon.png')}
          alt="리부트 배드민턴장 로고"
          width={28}
          height={34}
          priority
        />
        <span className={'block ' + doHyeon.className}>REBOOT</span>
        <span className={'block text-sm ' + doHyeon.className}>BADMINTON</span>
      </div>
    </Link>
  );
}
