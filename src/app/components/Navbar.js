'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

//auth
import { signIn, signOut, useSession } from "next-auth/react"

function Navbar() {
  const [scrolling, setScrolling] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  //auth
  const { data: session } = useSession();

  const handleCreateQRNavigation = () => {
    if (session) {
      router.push('/qrcode-generator');
    } else {
      signIn();
    }
  };

  return (
    <div
      className={` flex flex-row items-center justify-between p-4 z-[100] w-full fixed transition-all duration-300 bg-white
        }`}
    >
      <div className='flex flex-row justify-start items-center gap-10 ml-0 md:ml-12 lg:ml-12'>
        <Link href={'/'}>
          <p className='text-[#4361ee]'>QR generator by Tarun</p>
        </Link>
        <div className='hidden lg:flex flex-row gap-4'>
          <Link href={'/'}> Home </Link>
          <button onClick={handleCreateQRNavigation}>Create QR</button>
        </div>
      </div>
      <div className='lg:hidden'>
        <button onClick={toggleMobileMenu} className='text-[#4361ee] focus:outline-none '>
          {isMobileMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </button>
      </div>

      {session ? ( 
        <div className='hidden justify-end mr-12 lg:flex items-center'>
          <p className='text-[#ff006e] font-semibold mr-5'>{session?.user?.name}</p> <br />
          <button onClick={() => signOut()} className='bg-[#4361ee] text-white rounded-md p-2 font-bold'>Sign out</button>
        </div>
      ) : (
        <button onClick={() => signIn()} className='bg-[#4361ee] text-white rounded-md p-2 font-bold'>Sign in</button>
      )}

      {isMobileMenuOpen && (
        <div className='lg:hidden absolute top-full left-0 w-full bg-[#4361ee] flex flex-col justify-center items-center text-white p-4'>
          <Link href={'/'}> Home </Link>
          <button onClick={handleCreateQRNavigation}>Create QR</button>

          {session ? ( 
            <div className='justify-end lg:flex'>
              <p className='text-[#ff006e] font-semibold'>{session?.user?.name}</p> <br />
              <button onClick={() => signOut()} className='border-2 border-white bg-[#4361ee] text-white rounded-md p-2 font-bold'>Sign out</button>
            </div>
          ) : (
            <button onClick={() => signIn()} className='border-2 border-white bg-[#4361ee] text-white rounded-md p-2 font-bold'>Sign in</button>
          )}

        </div>
      )}
    </div>
  );
}

export default Navbar;
