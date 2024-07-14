import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '리부트 배드민턴',
  description: '리부트 배드민턴 레슨 전용구장',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <footer className="mt-4 pt-4 border-t text-center">
          <h1 className="text-lg mb-2">Follow Us</h1>
          <div className="text-sm mb-4">
            <a href="https://www.youtube.com/@An_troke" className="mr-6">
              <Image
                src="/youtube-icon.png"
                alt="안트로크 유튜브"
                width={20}
                height={20}
                className="inline mr-1"
              />
              <span className="hidden sm:inline">유튜브 (@An_troke)</span>
            </a>
            <a href="https://www.instagram.com/an_troke" className="mr-6">
              <Image
                src="/instagram-icon.png"
                alt="안트로크 인스타그램"
                width={20}
                height={20}
                className="inline mr-1"
              />
              <span className="hidden sm:inline">인스타그램 (an_troke)</span>
            </a>
            <a href="https://blog.naver.com/dkswls5946">
              <Image
                src="/naver-blog-icon.svg"
                alt="안트로크 네이버 블로그"
                width={20}
                height={20}
                className="inline mr-1"
              />
              <span className="hidden sm:inline">네이버 블로그</span>
            </a>
          </div>
          <div className="mb-4">
            경기 남양주시 진건읍 진건오남로390번길 89 1층
          </div>
          <div className="mb-4 text-sm">
            © 2024 리부트 배드민턴 전용구장. All Rights Reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
