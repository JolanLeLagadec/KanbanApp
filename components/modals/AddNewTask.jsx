'use client'
import React, { useEffect, useRef, useState } from 'react'
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
import { getColumns } from '@/actions/columns'
import { useParams } from 'next/navigation'
import useModal from '@/hooks/useModal'
import { toast } from 'sonner'
import {  useMutation, useQueryClient } from '@tanstack/react-query'


export default function AddNewTask() {

    const id = useParams().id
    const boardId = parseInt(id)
    const queryClient = useQueryClient()

    const modal = useModal()

    const [subTasks, setSubtask] = useState([''])
    const [form, setForm] = useState({})
    const [error, setError] = useState({})
    const [columnId, setColumnId] = useState()
    const [columns, setColumns] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleChangeFormValue = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const handleGetColumns = async () => {
            try {
                const columns = await getColumns(boardId)
                setColumns(columns)
            } catch (e) {
                console.error(e)
            }
        }
        handleGetColumns()
    }, [boardId])


    const mutation = useMutation({
        mutationFn: () => {
            return fetch(`/api/tasks?columnId=${columnId}`,{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(form)
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['getMenu']})
        }
    })
    const handleAddNewTask = async () => {
        let isValid = true
        const newErrors = {}
        if (!form.title) {
            newErrors.title = 'Title is missing'
            isValid = false
        }
        if (subTasks.some(subtask => subtask === '')) {
            newErrors.subTasks = "You can't give empty subtask";
            isValid = false
        }
        setError(newErrors)
        if (isValid) {
           mutation.mutate()
        }
       
    }


    const addSubtask = () => {
        setSubtask([...subTasks, ''])
    }
    const handleChangeValue = (index, event) => {
        const newSubtask = [...subTasks]
        newSubtask[index] = event.target.value
        setSubtask(newSubtask)
        setForm({
            ...form,
            subTasks: newSubtask
        })
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
                        name='title'
                        value={form.title}
                        onChange={handleChangeFormValue}
                        placeholder='e.g Web design'
                        className="dark:bg-neutral-700 text-black border-gray-300  focus:ring-mainPurple dark:border-neutral-600 dark:focus-visible:ring-offset-0 dark:text-white "
                    />
                    <span className='text-md text-red-500'>{error.title}</span>
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <label className='text-neutral-400 mt-4 dark:text-white'>Description</label>
                    <Textarea
                        name='description'
                        value={form.description}
                        onChange={handleChangeFormValue}
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
                <span className='text-md text-red-500 -mt-4'>{error.subTasks}</span>
                <Button
                    onClick={addSubtask}
                    className="text-mainPurple bg-blueGrayish font-medium rounded-full mt-4 hover:bg-purple-100">
                    <span className='text-mainPurple'>+</span>Add New Subtask
                </Button>
                <div className='mt-3' >
                    <Select onValueChange={(value) => setColumnId(parseInt(value))}>
                        <span className='mb-1 text-neutral-400 dark:text-white'>Columns</span>
                        <SelectTrigger className="w-full dark:bg-neutral-700 text-black border-gray-300  focus:ring-mainPurple dark:border-neutral-600 dark:focus-visible:ring-offset-0 dark:text-white">
                            <SelectValue placeholder="Select a statut" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup>
                                {
                                    columns.length > 0 &&
                                    columns.map((column) => (
                                        <div key={column.id}>
                                            <SelectItem value={column.id}>{column.name}</SelectItem>
                                        </div>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </>

    )
    return (
        <Modal
            onSubmit={handleAddNewTask}
            modalName='createTask'
            header="Add New Task"
            labelButton="Create Task"
            body={body}
        />
    )
}