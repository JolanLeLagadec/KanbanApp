'use client'
import React from 'react'
import { useState } from 'react'
import  iconBoard  from '@/starter-code/assets/icon-board.svg'
import Image from 'next/image'
import ButtonCreateNewBoard from '@/components/ButtonCreateNewBoard'

export default function MenuBoards() {

  const [isActive, setIsActive] = useState(false)

  return (
    <div className='w-full'>
      <h1 className='text-md text-neutral-400 tracking-widest uppercase pl-6'>all boards</h1>
      <div className='flex flex-col items-start gap-3 text-white mt-7'>
        <button
          onClick={() => setIsActive(!isActive)}
         className={`${isActive ? 'bg-mainPurple text-white' : 'text-neutral-400'}  rounded-r-full pl-6 py-3 w-[95%] font-semibold flex gap-4 items-center dark:hover:bg-neutral-100 transition-colors hover:text-mainPurple hover:bg-neutral-200 `}>
        <Image
          src={iconBoard}
          width={20}
          height={15}
          alt='iconboard'
          className=''
           />
        <h1>Platform Launch</h1>
        </button>   
        <ButtonCreateNewBoard />
      </div>
    </div>
  )
}
