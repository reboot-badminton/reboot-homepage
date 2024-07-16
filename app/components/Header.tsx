import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <Link href="/" className="flex justify-center items-center py-2 bg-white">
      <div className="text-center relative">
        <Image
          className="mr-2 rounded-full absolute -left-9 mt-1"
          src="/reboot-icon.png"
          alt="리부트 배드민턴장 로고"
          width={28}
          height={28}
          priority
        />
        <span
          className="block"
          style={{
            fontFamily: "Do Hyeon",
          }}
        >
          REBOOT
        </span>
        <span
          className="block text-sm"
          style={{
            fontFamily: "Do Hyeon",
          }}
        >
          BADMINTON
        </span>
      </div>
    </Link>
  );
}
