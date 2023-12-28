'use client'
import { Skeleton } from '@/components/ui/skeleton'
import useModal from '@/hooks/useModal'
import { getTask } from '@/request/tasks'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function Tasks({ task }) {

    const modal = useModal()
    const handleClick = () => {
        modal.setTaskId(task.id)
        modal.onOpen('seeTask')
    }
    const { data, isLoading  } = useQuery({
        queryKey: ['getTask', task.id],
        queryFn: () => getTask(task.id)
    })

    const subTasksDone = data?.subtask.filter(subT => subT.done).map(subT => subT.id)
  
    return (
        <div
         onClick={handleClick}
         className='w-full bg-white dark:bg-neutral-800 mt-7 rounded-xl cursor-pointer hover:opacity-80'>
            <div className='p-4  py-6 flex flex-col justify-center items-start'>
                <h1>{task.name}</h1>
               {
                    isLoading ? 
                    <Skeleton className='w-20 h-3 bg-neutral-400 mt-2' />:
                    data?.subtask.length > 0 &&
                    <span className='text-sm mt-2 text-neutral-400'>
                        {subTasksDone?.length} of {data?.subtask.length} subtasks
                    </span>
                }      
            </div>
        </div>
    )
}

