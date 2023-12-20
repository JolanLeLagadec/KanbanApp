'use client'
import React from 'react'
import { useState } from 'react'
import iconBoard from '@/starter-code/assets/icon-board.svg'
import Image from 'next/image'
import useBoardsMenu from '@/hooks/useBoardsMenu'
import { Switch } from '../ui/switch'
import logoDark from '@/starter-code/assets/icon-dark-theme.svg'
import logoLight from '@/starter-code/assets/icon-light-theme.svg'
import { useTheme } from "next-themes"

export default function MenuBoardsMobile() {

  const [isActive, setIsActive] = useState(false)

  const mobileMenu = useBoardsMenu()

  const { theme, setTheme } = useTheme()

  const handleClickTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }

  }

  if (!mobileMenu.isOpen) {
    return null;
  }
  return (
    <div className=' w-1/2 m-auto absolute mt-5 left-0 right-0 lg:hidden bg-white dark:bg-neutral-800 min-w-[400px] rounded-lg py-4'>
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
        <div className='bg-lightGray px-6 py-3 mt-4 flex justify-center items-center m-auto rounded-lg dark:bg-neutral-900'>
          <div className='flex justify-center items-center w-full gap-7'>
            <Image
              src={logoLight}
              height={20}
              width={18}
              alt='light'
            />
            <Switch onClick={handleClickTheme} />
            <Image
              src={logoDark}
              height={20}
              width={18}
              alt='dark'
            />

          </div>
        </div>
      </div>
    </div>
  )
}
