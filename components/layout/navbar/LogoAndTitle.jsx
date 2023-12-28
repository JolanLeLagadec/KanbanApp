import React from 'react'
import LogoKanban from './LogoKanban'
import useSideBar from '@/hooks/useSideBar'

export default function LogoAndTitle() {

    const sideBar = useSideBar()

    return (
        <div className={`hidden lg:flex justify-center items-center border-r h-full px-5 pr-14 gap-4 ${sideBar.isOpen ? 'lg:hidden' : ''}`}>
            <LogoKanban />
            <h1 className='font-extrabold text-3xl'>kanban</h1>
        </div>
    )
}
