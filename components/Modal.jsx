'use client'
import React, {  useRef } from 'react'
import { Button } from './ui/button'
import useModal from '@/hooks/useModal'
import { Plus } from 'lucide-react'

export default function Modal({ body, onSubmit, header, labelButton, modalName, disabled }) {

  const modalRef = useRef()
  const modal = useModal()

  const handleSubmit = () => {
  
    onSubmit()
  }

const handleClose = () => {
  modal.onClose(modalName)
}


  if(!modal.modals[modalName]){
    return null
  }
  return (
    <div className='fixed bg-neutral-800 h-full  bg-opacity-70 w-full flex justify-center items-center z-50 overflow-x-hidden overflow-y-auto'>
        <div ref={modalRef} className='w-3/4 sm:w-1/2 bg-white  max-w-4xl rounded-lg shadow-lg relative dark:bg-neutral-700 h-fit overflow-y-auto max-h-[95vh]'>
          <Plus
           onClick={handleClose}
           width={44}
           height={30}
           className='rotate-45 absolute right-4 top-8 fill-black cursor-pointer dark:fill-white' />
            <div className='p-6 flex flex-col w-full gap-7'>
              <h1 className='text-black mb-7 mt-2 text-2xl font-bold dark:text-white '>{header}</h1>
              {body}
              <Button
               disabled={disabled}
               onClick={handleSubmit}
               className="w-full py-3 text-white font-semibold bg-mainPurple rounded-full hover:bg-secondPurple text-md">{labelButton}</Button>
            </div>
        </div>
    </div>
  )
}
