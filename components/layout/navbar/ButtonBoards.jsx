'use client'
import useBoardsMenu from '@/hooks/useBoardsMenu'
import React from 'react'

export default function ButtonBoards() {

const menuBoardsMobile = useBoardsMenu()
    
  return (
    <>
    <button
     onClick={() => menuBoardsMobile.setIsOpen()}
     className='lg:hidden cursor-pointer gap-4 flex justify-center items-center'>
        <h1 className='font-bold text-2xl'>Platform Launch</h1>
        <div className='flex items-center justify-center gap-1 mt-1'>
            <div className={`h-3 w-[0.2rem]  bg-gray-400 transform ${menuBoardsMobile.isOpen ? 'rotate-45' : '-rotate-45'} duration-75   transform rounded-sm`}></div>
            <div className={`h-3 w-[0.2rem] bg-gray-400 ${menuBoardsMobile.isOpen ? '-rotate-45' : 'rotate-45'}  duration-75 transform rounded-sm`}></div>
        </div>
    </button>
    </>
  )
}
