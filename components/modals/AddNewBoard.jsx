'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import Modal from '../Modal'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'


export default function AddNewBoard() {

    const [columns, setColumns] = useState([{ value: 'Todo' }])
    const [name, setName] = useState('')


    const addColumns = () => {
        setColumns(columns.concat({ value: '' }))
    }

    const deleteColumn = (i) => {
        const newColumns = [...columns]
        newColumns.splice(i, 1)
        setColumns(newColumns)
    }

    const handleChangeInputValue = (index, event) => {
        const newColumns = [...columns]
        newColumns[index].value = event.target.value
        setColumns(newColumns)
    }
  
    const body = (
        <>
            <div className='flex flex-col gap-1 w-full'>
                <label className='text-neutral-400'>Board Name</label>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='e.g Web design'
                    className="dark:bg-neutral-700 text-black border-gray-300  focus:ring-mainPurple dark:border-neutral-600 dark:focus-visible:ring-offset-0 dark:text-white"
                />
            </div>
            <div className='flex flex-col gap-1 w-full'>
                <label className='text-neutral-400'>Board Columns</label>
                {
                    columns.map((column, index) => (
                        <div
                         key={index}
                         className='flex justify-center items-center gap-4 mb-4'>
                            <Input
                                value={column.value}
                                onChange={() => handleChangeInputValue(index, event)}
                                placeholder='e.g Web design'
                                className="dark:bg-neutral-700 text-black border-gray-300  focus:ring-mainPurple dark:border-neutral-600 dark:focus-visible:ring-offset-0 dark:text-white"
                            />
                            <button>
                                <Plus
                                 onClick={() => deleteColumn(index)}
                                 color='#B6BBC4' width={44} height={32} className='rotate-45' />
                            </button>
                        </div>
                    ))
                }
                <Button   
                    onClick={addColumns}
                    className="text-mainPurple bg-blueGrayish font-medium rounded-full mt-4 hover:bg-purple-100">
                    <span className='text-mainPurple'>+</span>Add New Column
                </Button>
            </div>
        </>
    
    )
    return (
        <Modal
            modalName='createBoard'
            header="Add New Board"
            labelButton="Create New Board"
            body={body}
        />
    )
}
