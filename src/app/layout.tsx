'use client';
// import type { Metadata } from 'next';
// import localFont from 'next/font/local';
import './globals.css';
import { Pridi } from 'next/font/google';
import { WeatherProvider } from '@/context/WeatherContext';
import HeaderBar from '@/components/HeaderBar/HeaderBar';
import Navbar from '@/components/Navbar/Navbar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const pridi = Pridi({
  subsets: ['latin'],
  weight: '400',
});

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsTransitioning(true);
    };

    const handleRouteChangeComplete = () => {
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100); // Animation duration
    };

    // Dinamik olarak sayfa geçişlerini dinlemek için push ve replace yöntemlerini override ediyoruz
    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = async (...args) => {
      handleRouteChangeStart();
      await originalPush(...args);
      handleRouteChangeComplete();
    };

    router.replace = async (...args) => {
      handleRouteChangeStart();
      await originalReplace(...args);
      handleRouteChangeComplete();
    };

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [router]);

  return (
    <html lang="en">
      <head>
        <title>Smart Weather App</title>
      </head>
      <body className={`${pridi.className} antialiased`}>
        <main className="flex bg-blue-50 min-h-screen ">
          <div className="mx-auto container justify-center mt-4 ">
            <WeatherProvider>
              <HeaderBar />
              <Navbar />
              <div className={`transition-container ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                {isTransitioning ? null : children}
              </div>
            </WeatherProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
