import React from 'react'
import ButtonBoards from './ButtonBoards'
import ButtonAddNewTask from './ButtonAddNewTaskAndMenu'
import LogoKanban from './LogoKanban'


export default function Navbar() {

  return (

  <div className='bg-white w-full border-b h-full shadow-lg'>
    <div className='p-5 flex justify-between items-center h-full'>
      <div className='flex justify-center items-center gap-4'>
        <LogoKanban />
        <ButtonBoards />
        <h1 className='hidden lg:block font-bold text-2xl'>Plateform Launch</h1>
      </div>
      <div className='flex justify-center items-center gap-3'>
        <ButtonAddNewTask />
       


      </div>

    </div>
  </div>
  )
}
