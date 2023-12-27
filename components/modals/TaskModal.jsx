'use client'
import useModal from '@/hooks/useModal'
import { getTask } from '@/request/tasks'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, Loader2, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Checkbox } from '../ui/checkbox'
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
import { useParams, usePathname } from 'next/navigation'
import MenuTaskModal from './MenuTaskModal'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Input } from '../ui/input'



export default function Taskmodal() {
    const modal = useModal()
    const taskId = modal.taskId

    const queryClient = useQueryClient()
    const { id } = useParams()
    console.log(id)
    const boardId = parseInt(id)
    const path = usePathname()

    const [isDone, setIsDone] = useState([])
    const [columns, setColumns] = useState([])
    const [columnId, setColumnId] = useState(null)
    const [newTask, setNewTask] = useState()
    const [isNewSubTask, setIsNewSubtask] = useState()
    const [newSubTask, setNewSubTask] = useState('')

    console.log(newSubTask)


    const subTaskMutation = useMutation({
        mutationFn: () => {
           return fetch(`/api/subtask/?id=${taskId}`, {
                method: 'POST',
                body: JSON.stringify(newSubTask)
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['getTask', taskId]})
            setIsNewSubtask(false)
            setNewSubTask('')
        }
    })

    // Récupérer l'id des subtasks
    // Regarder si l'id figure dans le tableau isDone, si oui on update task/subtask à cet id

    // Update le columnId

   

    useEffect(() => {
        setNewTask({ columnId, isDone })
    }, [columnId, isDone])
    useEffect(() => {
        const handleGetColumns = async () => {
            if (path === '/boards') {
                return;
            }
            try {
                const columns = await getColumns(boardId)
                setColumns(columns)
            } catch (e) {
                console.error(e)
            }
        }
        handleGetColumns()
    }, [boardId])

   

    const handleToggleDone = (subTaskId) => {
        setIsDone(prev => {
            const newIsDone = { ...prev };
            newIsDone[subTaskId] = !newIsDone[subTaskId]
            return newIsDone;
        })
    }

    const mutation = useMutation({
        mutationFn: () => {
            return fetch(`/api/tasks/${data.id}`, {
                method: "PUT",
                body: JSON.stringify(newTask)
            })
        },
        onSuccess:  () => {
            queryClient.invalidateQueries({queryKey: ['board', id]})
            
            toast.success('Task update with success')
            modal.onClose('seeTask')
        },
        onError: () => {
            toast.error('An error occured while updating, please try again')
        }
    })

    const { data, isLoading } = useQuery({
        queryKey: ['getTask', taskId],
        queryFn: () => getTask(taskId),
        enabled: modal.modals.seeTask
    })



    useEffect(() => {
        setColumnId(data?.columnId)
        if (data && data.subtask) {
            // Initialiser isDone avec les sous-tâches déjà "faites"
            
            const subTaskDone = {}
            data.subtask.forEach((subT) => {
                subTaskDone[parseInt(subT.id)] = subT.done
            })
            setIsDone(subTaskDone)

        }
    }, [data]);


    if (!modal.modals.seeTask) {
        return null;
    }
    return (
        <div className='fixed bg-neutral-800 bg-opacity-70 h-full w-full overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center'>
            <div className='p-4 flex flex-col justify-center bg-white dark:bg-neutral-800 gap-4 relative rounded-lg w-3/4 lg:w-1/2 max-w-xl'>
                <div className='absolute top-2 right-4 flex justify-center items-center '>
                    <MenuTaskModal onEdit={mutation.mutate} />
                    <Plus
                        onClick={() => modal.onClose('seeTask')}
                        width={44}
                        height={30}
                        className='rotate-45 fill-black cursor-pointer dark:fill-white' />
                </div>
                {
                    isLoading ? (
                        <>
                            <Loader2 className='animate-spin h-8 w-8 mx-auto p-24' />
                        </>
                    ) : (
                        <>
                            <h1 className='text-lg font-semibold'>{data?.name}</h1>
                            <p className='text-neutral-400 max-w-md'>{data?.description}</p>
                        </>
                    )
                }
                <div className='flex flex-col justify-center gap-4 w-full'>
                    <h1 className=' text-sm'><span>
                        {data?.subtask.length > 0 ? (
                            <>Subtasks {isDone.length} of {data?.subtask.length}</>
                        ) : (
                            'No subtask'
                        )}
                    </span></h1>
                    <div className='flex flex-col gap-4 w-full'>
                        {
                            !isLoading && data.subtask.map((subT) => (
                                <div
                                    onClick={() => handleToggleDone(subT.id)}
                                    key={subT.id}
                                    className={`p-3 rounded-lg bg-blueGrayish dark:bg-neutral-900 flex items-center gap-3 cursor-pointer ${isDone[subT.id] ? 'text-neutral-400' : 'bg-mainPurple dark:bg-secondPurple bg-opacity-40 dark:text-neutral-800'}`}
                                >
                                    <Checkbox
                                        onChange={() => handleToggleDone(subT.id)}
                                        checked={isDone[subT.id]} />
                                    <h1 className={`text-md font-semibold${isDone[subT.id] ? 'line-through' : ''}`}>{subT.name}</h1>
                                </div>
                            ))
                        }
                        {
                            isNewSubTask && (
                                <div className='flex items-center gap-2'>
                                    <Input
                                        value={newSubTask}
                                        onChange={(e) => setNewSubTask(e.target.value)}
                                        className='w-full dark:bg-neutral-900 focus:ring-offset-0 focus:ring-0 border-neutral-400 border-[0.5px] focus:ring-secondPurple'
                                    />
                                    <Button
                                        onClick={() => subTaskMutation.mutate()}
                                        disabled={!newSubTask}
                                        size='sm'
                                        className="border-2  " ><Check className='w-4 h-4' /></Button>
                                </div>

                            )
                        }
                        <Button
                            size='lg'
                            onClick={() => setIsNewSubtask(!isNewSubTask)}
                            className='p-3 rounded-lg  w-1/2 flex items-center gap-3 cursor-pointer bg-opacity-40 mx-auto 
                            '
                        >
                            +New subtask
                        </Button>
                        <div className='mt-3' >
                            <Select onValueChange={(value) => setColumnId(parseInt(value))}>
                                <span className='mb-2 text-neutral-400 dark:text-white'>Columns</span>
                                <SelectTrigger className="w-full dark:bg-neutral-800 text-black border-gray-300  focus:ring-mainPurple dark:border-neutral-600 dark:focus-visible:ring-offset-0 dark:text-white">
                                    <SelectValue placeholder="Select a column" />
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
                </div>
            </div>
        </div>
    )
}
