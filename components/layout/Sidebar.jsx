'use client'
import useSideBar from '@/hooks/useSideBar'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Sidebar() {

  const pathname = usePathname()
  const sideBar = useSideBar()

  if (pathname === '/' || !sideBar.isOpen ) {
    return null;
  }
  return (
    <div className='h-screen border-r w-full bg-white shadow-lg'>
        
    </div>
  )
}
