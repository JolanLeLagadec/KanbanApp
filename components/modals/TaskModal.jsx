'use client'
import useModal from '@/hooks/useModal'
import { getTask } from '@/request/tasks'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2, Plus } from 'lucide-react'
import React, { useEffect,  useState } from 'react'
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
import { useParams } from 'next/navigation'
import MenuTaskModal from './MenuTaskModal'
import { toast } from 'sonner'



export default function Taskmodal() {
    const modal = useModal()
    const taskId = modal.taskId
    const queryClient = useQueryClient()
    const { id } = useParams()
    const boardId = parseInt(id)
    
    const [isDone, setIsDone ] = useState([])
    const [columns, setColumns] = useState([])
    const [columnId, setColumnId] = useState(null)
    const [newTask, setNewTask] = useState()
   
    

    // Récupérer l'id des subtasks
    // Regarder si l'id figure dans le tableau isDone, si oui on update task/subtask à cet id

    // Update le columnId
 
    
    useEffect(() => {
        setNewTask({...newTask, columnId, isDone})
    }, [columnId, isDone])
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

    const handleToggleDone = (subTaskId) => {   
        setIsDone(prev => {
            const newIsDone = [...prev];
            if (newIsDone.includes(subTaskId)) {
                // Retirer l'id si déjà présent
                return newIsDone.filter(id => id !== subTaskId);
            } else {
                // Ajouter l'id si non présent
                return [...newIsDone, subTaskId];
            }
        });
        }
    
        const mutation = useMutation({
            mutationFn: () => {
                fetch(`/api/tasks/${data.id}`,{
                method: "PUT",
                body: JSON.stringify(newTask)
                })
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['getTask', data.id]})
                toast.success('Task update with success')
            },
            onError: () => {
                toast.error('An error occured while updating, please try again')
            }
        })
        const handleEditTask = () => {
            mutation.mutate()
        }
    const { data, isLoading } = useQuery({
        queryKey: ['getTask', taskId],
        queryFn: () => getTask(taskId),
        enabled: modal.modals.seeTask
    })

    useEffect(() => {
        if (data && data.subtask) {
            // Initialiser isDone avec les sous-tâches déjà "faites"
            const doneSubtasks = data.subtask.filter(subT => subT.done).map(subT => subT.id);
            setIsDone(doneSubtasks);
        }
    }, [data]);
    
    

    if (!modal.modals.seeTask) {
        return null;
    }
    return (
        <div className='fixed bg-neutral-800 bg-opacity-70 h-full w-full overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center'>
            <div className='p-4 flex flex-col justify-center bg-white dark:bg-neutral-800 gap-4 relative rounded-lg w-3/4 lg:w-1/2 max-w-xl'>
                <div className='absolute top-2 right-4 flex justify-center items-center '>
                    <MenuTaskModal onEdit={handleEditTask} />
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
                    <h1 className=' text-sm'>Subtasks <span>({isDone.length} of {data?.subtask.length})</span></h1>
                    <div className='flex flex-col gap-4 w-full'>
                        { 
                           !isLoading && data.subtask.map((subT) => (
                                        <div
                                        onClick={() => handleToggleDone(subT.id)} 
                                        key={subT.id}
                                        className={`p-3 rounded-lg bg-blueGrayish dark:bg-neutral-900 flex items-center gap-3 cursor-pointer ${isDone.includes(subT.id) ? 'text-neutral-400': 'bg-mainPurple dark:bg-secondPurple bg-opacity-40 dark:text-neutral-800'}`}
                                        >
                                       <Checkbox 
                                       onChange={() => handleToggleDone(subT.id)}
                                       checked={isDone.includes(subT.id)} />
                                        <h1 className={` text-md font-semibold${isDone.includes(subT.id) ? 'line-through': ''}`}>{subT.name}</h1>     
                                        </div>
                                    )) 
                        }
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
