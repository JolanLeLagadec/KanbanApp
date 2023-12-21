import { Button } from '@/components/ui/button'
import React from 'react'
import  iconAdd  from '@/starter-code/assets/icon-add-task-mobile.svg'
import  iconEllipsis  from '@/starter-code/assets/icon-vertical-ellipsis.svg'
import Image from 'next/image'
import useModal from '@/hooks/useModal'

export default function ButtonAddNewTaskAndMenu() {
const modal = useModal()
  return (
    <div className='flex justify-center items-center gap-5'>
        <Button
        onClick={() => modal.onOpen('createTask')}
         className="rounded-full bg-mainPurple px-5 lg:p-4 flex items-center justify-center gap-3 hover:bg-secondPurple">
           <Image
           src={iconAdd}
           width={15}
           height={15}
           alt='iconadd'
           />
          <span className='hidden lg:block text-white'>Add New Task</span>
        </Button>
        <Button

         variant='ghost'>
        <Image
           src={iconEllipsis}
           width={8}
           height={5}
           alt='iconadd'
           />
        </Button>
        
        
    </div>
  )
}
