'use client'
import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Navbar from './navbar/Navbar'
import useSideBar from '@/hooks/useSideBar'
import EyeSideBar from './sidebar/EyeSideBar'
import useBoardsMenu from '@/hooks/useBoardsMenu'
import MenuBoardsMobile from './MenuBoardsMobile'


export default function Layout({ children }) {

    const sideBar = useSideBar()
    const mobileMenu = useBoardsMenu()

    return (
        <main className='relative grid grid-cols-10 grid-rows-[7rem] h-screen'>
            <EyeSideBar />
            <div className={`hidden lg:grid lg:col-span-3 xl:col-span-2 col-start-1  ${sideBar.isOpen ? '' : 'lg:hidden'} `}>
                <Sidebar />
            </div>
            <div className={`col-span-10 ${sideBar.isOpen ? 'lg:col-span-7 xl:col-span-8 xl:col-start-3 lg:col-start-4' : 'col-start-1'} row-start-1 dark:bg-neutral-800 `}>
                <Navbar />
                <MenuBoardsMobile />    
            </div>
            <div className={`col-span-10 ${sideBar.isOpen ? 'lg:col-start-4 lg:col-span-7 xl:col-span-8 xl:col-start-3' : 'col-start-1'}  row-start-2 row-span-full bg-blueGrayish dark:bg-neutral-950 ${mobileMenu.isOpen ? 'bg-opacity-60' : ''}`}>    
                {children}
            </div>
        </main>
    )
}
