'use client'


import { getBoard } from '@/actions/boards'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import Column from './Column'
import { useParams } from 'next/navigation'
import { addColumn } from '@/actions/columns'
import { Input } from '@/components/ui/input'
import {  Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function Board({ boardId }) {

    const queryClient = useQueryClient()
    const [columnName, setColumnName] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [color, setColor] = useState('#635FC7')

    const { data: initialData } = useQuery({
        queryKey: ['board', boardId],
        queryFn: () => getBoard(boardId)
    })

    const ref = useRef(null);
    const { id } =  useParams()
    const mutation = useMutation({
        mutationFn: () => addColumn(id, columnName, color),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['board', id]})
            queryClient.invalidateQueries({queryKey: ['getColumns']})
            setColumnName('')
            setIsOpen(false)
            toast.success('Column created with success')
        }
    })
    
    const handleCreateColumn = () => {
        mutation.mutate()
    }

    return (
    
        <div className='p-6 w-full min-h-[91vh] overflow-x-auto'>
            <div className='grid grid-flow-col auto-cols-max h-auto space-x-7 ' >
                {
                    initialData?.column.map((column) => (     
                        <div key={column.id} className='w-[21rem]'>
                            <Column column={column}  />   
                        </div>
                    ))
                }
                {
                    isOpen ? 
                    <div className='bg-lightGray dark:bg-neutral-800 flex flex-col justify-center p-4 rounded-lg relative gap-1'>
                        <Plus
                        onClick={() => setIsOpen(false)}
                        className='w-5 h-4 fill-secondPurple rotate-45 absolute top-5 right-4 cursor-pointer'
                         />
                        <span className='text-neutral-500'>Add a new column</span>
                        <Input
                        className='focus-visible:ring-offset-0 focus-visible:ring-0 ring-gray-400'
                        onChange={(e) => setColumnName(e.target.value) }
                         />
                         <div className='flex items-center gap-2'>
                        <span className='text-md font-light'>Pick a color</span>
                         <Input
                            onChange={(e) => setColor(e.target.value) }
                            type='color'
                            value={color}
                            className='w-12 cursor-pointer rounded-full border-none focus-visible:ring-offset-0 focus-visible:ring-0'
                             />
                         </div>                       
                         {
                            columnName && 
                            <Button
                            onClick={handleCreateColumn}
                            variant='ghost'
                            className="w-4 dark:text-neutral-400 uppercase tracking-widest flex justify-center items-center"
                             >
                           ok
                           </Button>
                         }  
                    </div> :      
                <button
                onClick={() => setIsOpen(true)} 
                className='h-full min-h-[5rem] bg-white dark:bg-neutral-800 rounded-lg px-4 hover:opacity-80'>
                    <h1 className='text-xl font-semibold text-neutral-600 dark:text-neutral-100 '><span>+</span>Create new column</h1>
                </button>
                }
            </div>
        </div>
    )
}
