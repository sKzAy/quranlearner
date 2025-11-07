'use client';

import React from 'react';
import Link from 'next/link';

const SimpleFooter2 = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`bg-gray-800 text-white py-6 mt-auto h-[35vh] max-md:h-[40vh]`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            <p>&copy; {currentYear} YourQuran. All rights reserved.</p>
            <p className='text-lg text-white'>To Keep this site running: </p>
            <a href="https://ko-fi.com/kazimali"><img width={"200px"} src="/support_me_on_kofi_dark.png" alt="Donate" /></a>
          </div>
          <div>
            <p className='text-center'>Navigate:</p>
            <div className="nav flex gap-3">
              <Link className='hover:underline transition-all duration-300 hover:transition-all hover:duration-300' href={"/choose"}>Select Surah</Link>
              <Link className='hover:underline transition-all duration-300 hover:transition-all hover:duration-300' href={"/search"}>Search Surah</Link>
              <Link className='hover:underline transition-all duration-300 hover:transition-all hover:duration-300' href={"/dashboard"}>Dashboard</Link>
            </div>
            <div className="links max-md:hidden">
              <p className='text-center'>Popular Links: </p>
              <div className='flex gap-3'>
              <Link className='hover:underline transition-all duration-300 hover:transition-all hover:duration-300' href={"/quran/1"}>Al-Fatihah</Link>
              <Link className='hover:underline transition-all duration-300 hover:transition-all hover:duration-300' href={"/quran/2"}>Al-Baqarah</Link>
              <Link className='hover:underline transition-all duration-300 hover:transition-all hover:duration-300' href={"/quran/55"}>Ar-Rahman</Link>
              </div>
            </div>
          </div>

          </div>
      </div>
    
    </footer>
  );
};

export default SimpleFooter2;