'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import iconBoard from '@/starter-code/assets/icon-board.svg'
import Image from 'next/image'
import ButtonCreateNewBoard from '@/components/ButtonCreateNewBoard'
import Link from 'next/link'
import { getBoards } from '@/request/boards'
import { useQuery } from '@tanstack/react-query'


export default function MenuBoards() {

  const [isActive, setIsActive] = useState(null)

  const { data: boards } = useQuery({
    queryKey: ['getMenu'],
    queryFn: () => getBoards()
  })

  return (
    <div className='w-full'>
      <h1 className='text-md text-neutral-400 tracking-widest uppercase pl-6'>all boards</h1>
      <div className='flex flex-col items-start gap-3 text-white mt-7'>
        {
          boards?.map((board, index) => (
            <Link
              href={`/boards/${board.id}`}
              key={board.id}
              onClick={() => setIsActive(board.id)}
              className={`${isActive === board.id ? 'bg-mainPurple text-white' : 'text-neutral-400'}  rounded-r-full pl-6 py-3 w-[95%] font-semibold flex gap-4 items-center dark:hover:bg-neutral-100 transition-colors hover:text-mainPurple hover:bg-neutral-200 `}>
              <Image
                src={iconBoard}
                width={20}
                height={15}
                alt='iconboard'
                className=''
              />
              <h1>{board.name}</h1>
            </Link>

          ))
        }

        <ButtonCreateNewBoard />
      </div>
    </div>
  )
}
