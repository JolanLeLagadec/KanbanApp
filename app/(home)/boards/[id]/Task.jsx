'use client'
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

    const { data } = useQuery({
        queryKey: ['getTask', task.id],
        queryFn: () => getTask(task.id)
    })

    const subTasksDone = data?.subtask.filter(subT => subT.done).map(subT => subT.id)
    console.log(subTasksDone)

    return (
        <div
         onClick={handleClick}
         className='w-full bg-white dark:bg-neutral-800 mt-7 rounded-xl cursor-pointer hover:opacity-80'>
            <div className='p-4  py-6 flex flex-col justify-center items-start'>
                <h1>{task.name}</h1>
                <span className='text-sm mt-2 text-neutral-400'>{subTasksDone?.length} of {data?.subtask.length} subtasks</span>
            </div>
        </div>
    )
}

