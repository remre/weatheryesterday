import React from 'react';
import HeaderBar from '@/components/HeaderBar/HeaderBar';
import Navbar from '@/components/Navbar/Navbar';
import Weather from '@/components/Weather/Weather';
export default function Home() {
  return (
    <div className="mx-auto container justify-center">
      <HeaderBar />
      <Navbar />
      <Weather />
    </div>
  );
}
