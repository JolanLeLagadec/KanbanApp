'use client'
import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './navbar/Navbar'
import useSideBar from '@/hooks/useSideBar'


export default function Layout({ children }) {
    const sideBar = useSideBar()
    console.log(sideBar)
    return (
        <main className='grid grid-cols-10 grid-rows-[7rem] lg:grid-flow-col h-screen'>
            <div className='hidden lg:col-start-1 col-span-3 xl:col-span-2 '>
                <Sidebar />
            </div>
            <div className={`col-start-1 col-span-10 ${sideBar.isOpen ? 'lg:col-span-7 xl:col-span-8 lg:col-start-4' : 'col-start-1'} row-start-1 `}>
                <Navbar />
            </div>
        
            <div className={`col-span-10 ${sideBar.isOpen ? 'lg:col-start-4 lg:col-span-7 xl:col-span-8' : 'col-start-1'} row-start-2 row-span-full bg-blueGrayish`}>
                {children}
            </div>
        </main>
    )
}
