import React from 'react';
export default function Home() {
  return (
    <div
      className="mx-auto container justify-center flex items-center flex-col pt-10"
      style={{ textShadow: '1px 1px 1px orange' }}
    >
      <h1 className="title-first !text-black font-bold my-4">Welcome to the Weather App</h1>
      <p className="title-first !font-semibold text-shadow-lg ">
        Search for the location and Select a tab to view the weather forecast.
      </p>
    </div>
  );
}
