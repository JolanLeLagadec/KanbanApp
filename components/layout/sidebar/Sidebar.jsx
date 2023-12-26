'use client'
import useSideBar from '@/hooks/useSideBar'
import { usePathname } from 'next/navigation'
import React from 'react'
import LogoKanban from '../navbar/LogoKanban'
import MenuBoards from './MenuBoards'
import logoDark from '@/starter-code/assets/icon-dark-theme.svg'
import logoLight from '@/starter-code/assets/icon-light-theme.svg'

import { Switch } from '../../ui/switch'
import Image from 'next/image'
import { EyeOff } from 'lucide-react'
import { useTheme } from "next-themes"

export default function Sidebar() {

  const pathname = usePathname()
  const sideBar = useSideBar()

  const { theme, setTheme } = useTheme()

  const handleClickTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  if (!sideBar.isOpen) {
    return null;
  }
  return (
    <div className='h-screen w-full bg-white dark:bg-neutral-800 shadow-sm'>
      <div className='flex flex-col h-[95%]'>
        <div>
          <div className='flex justify-start items-center border-r gap-4 py-10 pl-6 '>
            <LogoKanban />
            <h1 className='font-extrabold text-3xl'>kanban</h1>
          </div>
          <MenuBoards />
          
        </div>
        <div className='w-full p-5 mt-auto'>
          <div className='flex flex-col gap-4 py-8'>
            <div className='bg-lightGray p-4 flex justify-center items-center w-full rounded-lg dark:bg-neutral-900'>
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
          <button onClick={() => sideBar.setIsOpen()} className='flex items-center gap-4'>
            <EyeOff color="#ababab" />
            <p className='text-lg font-semibold text-neutral-400'>Hide Sidebar</p>
          </button>

        </div>
      </div>
    </div>
  )
}
