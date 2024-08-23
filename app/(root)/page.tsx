import { navLinks } from '@/constants'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
    <section className='home'>
      <h1 className='home-heading'>Unleash your Creative  with ImageRevamp</h1>
      <ul className='flex-center w-full gap-12'>
        {navLinks.slice(1,6).map((link) => (
          <Link key={link.route} href={link.route} className='flex-center flex-col gap-2'>
            <li className='flex-center w-fit rounded-full bg-white p-4'>
              <Image
              src={link.icon}
              alt={link.label}
              width={24}
              height={24}
               />
            </li>
            <p className='text-white'>{link.label}</p>
          </Link>
        ))}
      </ul>
   </section>
    </>
  )
}

export default page

