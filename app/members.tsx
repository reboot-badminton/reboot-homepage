import Image from 'next/image';
import { src } from './image_utils';

interface MemberProps {
  name: string;
  imageSrc: string;
  description: string;
}

function Member({ name, imageSrc, description }: MemberProps) {
  return (
    <div className="flex-grow relative">
      <Image src={src(imageSrc)} width={150} height={150} alt={name} />
      <div className="absolute bottom-0 left-0 right-0 top-1/3 bg-gradient-to-t from-gray-800/50 via-transparent to-transparent"></div>
      <div
        className="absolute bottom-1 left-2 text-white"
        style={{
          textShadow: '1px 1px 2px #777',
        }}
      >
        <span className="font-bold tracking-wider text-sm mr-1">{name}</span>
        <span className="text-xs">{description}</span>
      </div>
    </div>
  );
}

export default function Members() {
  return (
    <>
      <h1 className="ml-1 mb-1 font-bold text-gray-700">Reboot Members</h1>
      <div className="flex gap-1 mx-1">
        <Member
          name="조승훈"
          imageSrc="/members/조승훈.jpg"
          description="코치"
        />
        <Member
          name="김아성"
          imageSrc="/members/김아성.png"
          description="코치"
        />
        <Member
          name="신수경"
          imageSrc="/members/신수경.jpg"
          description="매니저"
        />
      </div>
    </>
  );
}
