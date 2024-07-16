import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Image from 'next/image';
import ManagerSignIn from './components/ManagerSignIn';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '리부트 배드민턴 전용구장 | 남양주시 최고의 배드민턴 레슨',
  description:
    '리부트 배드민턴 레슨 전용구장은 남양주시에 위치한 레슨 전용 배드민턴장입니다. 최고의 코치진이 맞춤형 집중 레슨을 제공합니다. 지금 예약하세요!',
  openGraph: {
    title: '리부트 배드민턴 전용구장',
    description: '남양주시 최고의 배드민턴 레슨',
    url: '', // 실제 URL로 바꾸기
    siteName: '리부트 배드민턴 전용구장',
    images: [
      {
        url: 'https://scontent-gmp1-1.cdninstagram.com/v/t39.30808-6/447861963_2201454360207116_5210493627184318316_n.jpg?stp=c0.64.1536.1920a_cp6_dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNTM2eDIwNDguc2RyLmYzMDgwOCJ9&_nc_ht=scontent-gmp1-1.cdninstagram.com&_nc_cat=108&_nc_ohc=XZAb32szmpMQ7kNvgE8Py07&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzM4Nzk4ODEyNDE1MDY3OTIzNA%3D%3D.2-ccb7-5&oh=00_AYDyTQF4FUZkBBM2UF5qaW1yeB4SzOiQ4r8tkLEDsQOPKw&oe=669917DE&_nc_sid=ee9879',
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap'
          rel='stylesheet'
        />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <footer className='mt-4 pt-4 border-t text-center  text-gray-500'>
          <h1 className='text-lg mb-2 font-bold'>Follow Us</h1>
          <div className='text-sm mb-4'>
            <a href='https://www.youtube.com/@An_troke' className='mr-6'>
              <Image
                src='/youtube-icon.png'
                alt='안트로크 유튜브'
                width={20}
                height={20}
                className='inline mr-1'
              />
              <span className='hidden sm:inline'>유튜브 (@An_troke)</span>
            </a>
            <a href='https://www.instagram.com/an_troke' className='mr-6'>
              <Image
                src='/instagram-icon.png'
                alt='안트로크 인스타그램'
                width={20}
                height={20}
                className='inline mr-1'
              />
              <span className='hidden sm:inline'>인스타그램 (an_troke)</span>
            </a>
            <a href='https://blog.naver.com/dkswls5946'>
              <Image
                src='/naver-blog-icon.svg'
                alt='안트로크 네이버 블로그'
                width={20}
                height={20}
                className='inline mr-1'
              />
              <span className='hidden sm:inline'>네이버 블로그</span>
            </a>
          </div>
          <div className='mb-4 text-sm'>
            경기 남양주시 진건읍 진건오남로390번길 89 1층
          </div>
          <div className='mb-4 text-xs'>
            © 2024 리부트 배드민턴 전용구장. All Rights Reserved.
          </div>
          <ManagerSignIn />
        </footer>
      </body>
    </html>
  );
}
