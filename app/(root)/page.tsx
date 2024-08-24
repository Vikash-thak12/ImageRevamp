import { Collection } from '@/components/shared/Collection'
import { navLinks } from '@/constants'
import { getAllImages } from '@/lib/actions/image.actions'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async ({ searchParams }: SearchParamProps) => {

  const { userId } = auth()


  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";
  const images = await getAllImages({ page, searchQuery })
  return (
    <>
      {
        userId ? (
          <>
            <section className='bg-custom-gradient rounded-lg py-10 hidden lg:block'>
              <h1 className='h1-semibold mb-10 text-center text-xl text-white shadow-sm'>Unleash your Creative Vision with ImageRevamp</h1>
              <ul className='lg:flex-center w-full gap-12 lg:block'>
                {navLinks.slice(1, 6).map((link) => (
                  <Link key={link.route} href={link.route} className='flex-center flex-col gap-2 hover:scale-110 hover:transition-all'>
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

            <section className='sm:mt-12'>
              <Collection
                hasSearch={true}
                images={images?.data}
                totalPages={images?.totalPage}
                page={page}
              />
            </section>
          </>
        ) : (
          //TODO: update or Design the below code 
          <>
            <section className='bg-custom-gradient rounded-3xl py-10'>
              <h1 className='lg:h1-semibold t mb-10 text-center lg:text-xl text-white shadow-sm'>Improve, renovate, or give a fresh and updated appearance to your Image.</h1>
            </section>
            <div className='mt-10 flex justify-center'>
              <Image
                src="/assets/images/main.jpg"
                // src="/assets/images/main.png"
                alt='main'
                width={750}
                height={150}
                className='rounded-full'
              />
            </div>
          </>
        )
      }

    </>
  )
}

export default page

