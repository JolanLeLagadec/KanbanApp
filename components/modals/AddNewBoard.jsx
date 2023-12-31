'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import Modal from '../Modal'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useModal from '@/hooks/useModal'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'


export default function AddNewBoard() {

    const [columns, setColumns] = useState(['Todo'])
    const [name, setName] = useState('')
    const [error, setErrorMessages] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [color, setColor] = useState([])
    
    const handleChangeColor = (e, index) => {
        const newColors = [...color]
        newColors[index] = e.target.value
        setColor(newColors)    
    }

    const router = useRouter()
    const modal = useModal()
    const queryClient = useQueryClient()

    const createNewBoard = async () => {
        setIsLoading(true)
        const data = {name, columns, color}
        let isValid = true
        const newErrors = {nameError: '', columnError: ''}
        if(!data.name){
            newErrors.nameError = 'You must have to specify a board name'
            isValid = false
            setIsLoading(false)
        }
        if(columns.some(column => column === '')){
            newErrors.columnError = "You can't give an empty column"
            isValid = false
            setIsLoading(false)
        }
        setErrorMessages(newErrors)
        if(isValid){
            mutation.mutate(data)
        }
    }
    const mutation = useMutation({
        mutationFn: (data) => {
            return fetch('/api/boards',
           {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data),      
            })
        },
        onSuccess: async (res) => {
            const board =  await res.json()
            queryClient.invalidateQueries({queryKey: ['getMenu']})
            router.push(`/boards/${board.id}`)
            modal.onClose('createBoard')
            toast.success(`The board has been successfully created`)
            setIsLoading(false)
        },
        onError: (e) => {
            modal.onClose('createBoard')
            setIsLoading(false)
            toast.error('An error occured while creating the board')
            console.log(e)
        }
    })
    const addColumns = () => {
        setColumns(columns.concat(['']))
    }

    const deleteColumn = (i) => {
        const newColumns = [...columns]
        newColumns.splice(i, 1)
        setColumns(newColumns)
    }

    const handleChangeInputValue = (index, event) => {
        const newColumns = [...columns]
        newColumns[index] = event.target.value
        setColumns(newColumns)
    }
  
    const body = (
        <>
            <div className='flex flex-col gap-1 w-full'>
                <label className='text-neutral-400'>Board Name</label>
                <Input
                    disabled={isLoading}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='e.g Web design'
                    className="dark:bg-neutral-700 text-black border-gray-300  focus:ring-mainPurple dark:border-neutral-600 dark:focus-visible:ring-offset-0 dark:text-white"
                />
                <span className='text-red-500 text-lg'>{error.nameError}</span>
            </div>
            <div className='flex flex-col gap-1 w-full'>
                <label className='text-neutral-400'>Board Columns</label>
                {
                    columns.map((column, index) => (
                        <div
                         key={index}
                         className='flex justify-center items-center gap-4 mb-4'>
                            <Input
                                value={column}
                                disabled={isLoading}
                                onChange={(event) => handleChangeInputValue(index, event)}
                                placeholder='e.g Web design'
                                className="dark:bg-neutral-700 text-black border-gray-300  focus:ring-mainPurple dark:border-neutral-600 dark:focus-visible:ring-offset-0 dark:text-white"
                            />
                            <div className='flex flex-col items-center gap-1'>
                            <Input
                            onChange={(e) => handleChangeColor(e, index) }
                            type='color'
                            value={color[index]}
                            className='w-18 cursor-pointer rounded-full'
                             />
                            </div>
                            
                            <button>
                                <Plus
                                 onClick={() => deleteColumn(index)}
                                 color='#B6BBC4' width={44} height={32} className='rotate-45' />
                            </button>
                        </div>
                    ))
                }
                <span className='text-red-500 text-lg' >{error.columnError}</span>
                <Button 
                    disabled={isLoading}  
                    onClick={addColumns}
                    className="text-mainPurple bg-blueGrayish font-medium rounded-full mt-4 hover:bg-purple-100">
                    <span className='text-mainPurple'>+</span>Add New Column
                </Button>
              
            </div>
            </>
       
    
    )
    return (
        <Modal
            disabled={isLoading}
            modalName='createBoard'
            header="Add New Board"
            labelButton="Create New Board"
            body={body}
            onSubmit={createNewBoard}
        />
    )
}
