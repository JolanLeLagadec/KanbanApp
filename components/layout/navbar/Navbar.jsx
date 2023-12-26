'use client'
import React, { useEffect, useState } from 'react'
import ButtonBoards from './ButtonBoards'
import ButtonAddNewTaskAndMenu from './ButtonAddNewTaskAndMenu'
import LogoKanban from './LogoKanban'
import LogoAndTitle from './LogoAndTitle'
import { useParams } from 'next/navigation'
import { getBoard } from '@/request/boards'
import { useQuery } from '@tanstack/react-query'



export default function Navbar() {

const params = useParams()
const { id } = params
const [name, setName] = useState('')

const { data } = useQuery({
  queryKey: ['boardName', id],
  queryFn: async () => await getBoard(id),
})


useEffect(() => {
 if(data){
  setName(data.name)
 }
}, [data])


  return (
  <div className='bg-white w-full border-b h-full shadow-lg dark:bg-neutral-800 '>
    <div className='p-5 lg:p-0 flex justify-between items-center h-full'>
      <div className='flex justify-center items-center gap-4 h-full'>
        <LogoAndTitle />
        <div className='lg:hidden flex justify-center items-center gap-4'>
        <LogoKanban />
        <ButtonBoards />
        </div>
        {
          name && (
            <h1 className='hidden lg:block font-bold text-2xl pl-4'>{name}</h1>
          )
        }    
      </div>
      <div className='flex justify-center items-center gap-3'>
        <ButtonAddNewTaskAndMenu id={id} />
       
      </div>

    </div>
  </div>
  )
}
