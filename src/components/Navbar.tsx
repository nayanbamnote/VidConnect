import { UserButton } from '@clerk/nextjs'
import { Video } from 'lucide-react'
import React from 'react'
import MobileSideBar from './MobileSideBar'
import Link from 'next/link'


const Navbar = () => {
  return (
    <div className='px-10 py-4 flex justify-between  bg-[#1a1d2c]'>
        <Link href='/' className='flex gap-3 '>
            <Video size={34} color="#ffffff" />
            <p className='font-bold text-white text-2xl max-sm:hidden'>Zoom</p>
        </Link >

        <div className='flex justify-center items-center gap-4'>
          <UserButton />

          <div className=' sm:hidden'>
            <MobileSideBar />
          </div>

        </div>
    </div>
  )
}

export default Navbar