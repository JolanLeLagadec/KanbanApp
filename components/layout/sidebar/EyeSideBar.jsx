'use client'
import useSideBar from '@/hooks/useSideBar'
import React from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function EyeSideBar() {

    const sideBar = useSideBar()

if(sideBar.isOpen){
    return null
}
  return (
    <div className='hidden bg-mainPurple rounded-r-full w-[4rem] absolute bottom-[7rem] left-0 lg:block hover:opacity-70 cursor-pointer'>
        <button onClick={() => sideBar.setIsOpen()} className='flex justify-center items-center p-4 w-full'>
            <Eye color="#ffffff" />
        </button>
    </div>
  )
}
