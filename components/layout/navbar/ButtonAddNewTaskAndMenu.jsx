import { Button } from '@/components/ui/button'
import React from 'react'
import iconAdd from '@/starter-code/assets/icon-add-task-mobile.svg'
import Image from 'next/image'
import useModal from '@/hooks/useModal'
import EllipsisMenu from '@/components/EllipsisMenu'

export default function ButtonAddNewTaskAndMenu({ id }) {

  const modal = useModal()

  return (
    <div className='flex justify-center items-center gap-5 '>
      {
        id && (
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
        )
      }
      <EllipsisMenu />
    </div>
  )
}
