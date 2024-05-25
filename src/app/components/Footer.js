import React from 'react'
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'

function Footer() {
  return (
    <footer className='w-full bg-[#4361ee] p-4 items-center flex flex-col md:flex-row lg:flex-row justify-around'>
        <span className='text-white'>Made with ❤️ by @Tarun</span>
        <span className='flex gap-4'>
            <a href="https://www.instagram.com/targrapher24"><FaInstagram size={30} color='white' /></a>
            <a href="https://github.com/tarunsinghofficial"><FaGithub size={30} color='white' /></a>
            <a href="https://www.linkedin.com/in/tarunsingh24"><FaLinkedin size={30} color='white' /></a>
        </span>
    </footer>
  )
}

export default Footer