'use client'
import React, { useRef, useState } from 'react'
import { Input } from '../ui/input'
import Modal from '../Modal'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


export default function AddNewTask() {


    const [subTasks, setSubtask] = useState([''])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    
    const addSubtask = () => {
        setSubtask([...subTasks, ''])
    }

    const handleChangeValue = (index, event) => {
        const newSubtask = [...subTasks]
        newSubtask[index] = event.target.value
        setSubtask(newSubtask)

    }
    const deleteSubtask = (i) => {
        const newSubtasks = [...subTasks]
        newSubtasks.splice(i, 1)
        setSubtask(newSubtasks)
    }

    const body = (
        <>
            <div className='flex flex-col gap-1 w-full '>
                <div className='flex flex-col gap-1 w-full'>
                    <label className='text-neutral-400 dark:text-white'>Title</label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='e.g Web design'
                        className="dark:bg-neutral-700 text-black border-gray-300  focus:ring-mainPurple dark:border-neutral-600 dark:focus-visible:ring-offset-0 dark:text-white "
                    />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <label className='text-neutral-400 mt-4 dark:text-white'>Description</label>
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g it's always good to take a break. This 15 minutes break will recharge the batteries a little. "
                        className="dark:bg-neutral-700 text-black border-gray-300  focus:ring-mainPurple dark:border-neutral-600 dark:focus-visible:ring-offset-0 dark:text-white h-[7rem]"
                    />
                </div>
            </div>
            <div className='flex flex-col gap-1 w-full'>
                <label className='text-neutral-400 dark:text-white'>Subtasks</label>
                {
                    subTasks.map((subTask, index) => (
                        <div
                            key={index}
                            className='flex justify-center items-center gap-4 mb-4'>
                            <Input
                                value={subTask}
                                onChange={() => handleChangeValue(index, event)}
                                placeholder='e.g Web design'
                                className="dark:bg-neutral-700 text-black border-gray-300  focus:ring-mainPurple dark:border-neutral-600 dark:focus-visible:ring-offset-0 dark:text-white"
                            />
                            <button>
                                <Plus
                                    onClick={() => deleteSubtask(index)}
                                    color='#B6BBC4' width={44} height={32} className='rotate-45' />
                            </button>
                        </div>
                    ))
                }
                <div >
                <Select>
                    <SelectTrigger className="w-1/2 dark:bg-neutral-700 text-black border-gray-300  focus:ring-mainPurple dark:border-neutral-600 dark:focus-visible:ring-offset-0 dark:text-white">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem onClick={() => setDropDown(false)} value="apple">Apple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                </div>  
                <Button
                    onClick={addSubtask}
                    className="text-mainPurple bg-blueGrayish font-medium rounded-full mt-4 hover:bg-purple-100">
                    <span className='text-mainPurple'>+</span>Add New Subtask
                </Button>
            </div>
        </>

    )
    return (
        <Modal
           
            modalName='createTask'
            header="Add New Task"
            labelButton="Create Task"
            body={body}
        />
    )
}