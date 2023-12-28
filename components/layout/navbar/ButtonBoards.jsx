'use client'
import { getBoard } from '@/actions/boards'
import useBoardsMenu from '@/hooks/useBoardsMenu'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function ButtonBoards() {

const menuMobile = useBoardsMenu()
const { id } = useParams()
const [name, setName ] = useState()


 
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
    <>
    <button
     onClick={() => menuMobile.setIsOpen()}
     className='lg:hidden cursor-pointer gap-4 flex justify-center items-center'>
      {
        id && (
          <h1 className='font-bold text-2xl'>{name}</h1>
        )
      }
        <div className='flex items-center justify-center gap-1 mt-1'>
            <div className={`h-3 w-[0.2rem]  bg-gray-400 transform ${menuMobile.isOpen ? 'rotate-45' : '-rotate-45'} duration-75   transform rounded-sm`}></div>
            <div className={`h-3 w-[0.2rem] bg-gray-400 ${menuMobile.isOpen ? '-rotate-45' : 'rotate-45'}  duration-75 transform rounded-sm`}></div>
        </div>
    </button>
    </>
  )
}
