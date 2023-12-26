'use client'
import useModal from '@/hooks/useModal'
import { Plus } from 'lucide-react'
import React from 'react'

export default function Boards() {
  const modal = useModal()

  return (
    <div className='flex justify-center items-center h-full w-full'>
     <button
       onClick={() => modal.onOpen('createBoard')}
       className='hover:opacity-80 rounded-b-full pl-6 py-3  font-semibold flex gap-4 items-center  transition-colors text-mainPurple  '>
         <div className='flex items-center justify-center'>
         <Plus size={16} color="#635FC7" strokeWidth={4} className='mt-1' />
         <h1 className='text-3xl dark:text-neutral-200 text-neutral-800'>Create New Board</h1>
         </div>
      </button>   
    </div>  
  )
}
