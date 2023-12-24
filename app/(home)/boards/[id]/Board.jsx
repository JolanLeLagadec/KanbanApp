'use client'


import { getBoard } from '@/actions/boards'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Column from './Column'

export default function Board({ boardId }) {

    const { data } = useQuery({
        queryKey: ['board', boardId],
        queryFn: () => getBoard(boardId)
    })

  
    return (
        <div className='p-4 h-auto w-auto'>
            <div className=' grid grid-flow-col overflow-auto auto-cols-max space-x-4 '>
                {
                    data?.column.map((column) => (
                        <div key={column.id} className='col-span-2'>
                            <Column column={column} />
                        </div>
                    ))
                }


            </div>
        </div>
    )
}
