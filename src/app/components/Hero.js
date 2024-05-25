'use client'
import React from 'react'
import Image from 'next/image'
import vector from "../assets/vector.jpg"
import Link from 'next/link'
//auth
import { signIn, signOut, useSession } from "next-auth/react"

function Hero() {

  const { data: session } = useSession();

  return (
    <main className='bg-white h-screen flex items-center justify-center'>
      <div className="flex flex-col md:flex-row lg:flex-row justify-between gap-10 p-10">
        <div className='flex items-center'>
          <div className="flex flex-col space-y-10 p-4">
            <h2 className="text-2xl md:text-4xl lg:text-7xl font-extrabold max-w-2xl">
              Create a custom QR Code in seconds!
            </h2>
            <div className='flex space-x-4'>
              {session ? (
                <div className='flex flex-col'>
                  <p className='text-lg md:text-xl lg:text-3xl text-[#ff006e] font-semibold'>Welcome, {session?.user?.name}!</p> <br />
                  <Link href="/qrcode-generator" className='bg-[#4361ee] text-white rounded-md p-2 font-bold w-[8em] text-center'>Create now</Link>
                </div>
              ) : (
                <button onClick={() => signIn()} className='bg-[#4361ee] text-white rounded-md p-2 font-bold'>Create now</button>
              )}
            </div>
          </div>
        </div>
        <div className='hover:rotate-[5deg] transition-all hover:scale-105 hover:duration-300'>
          <Image src={vector} className='w-[20em] h-[20em] md:w-[40em] md:h-[35em] lg:w-[35em] lg:h-[35em]' width={1000} height={1000} alt='qr code' />
        </div>
      </div>
    </main>
  )
}

export default Hero