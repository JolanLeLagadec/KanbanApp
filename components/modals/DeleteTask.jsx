'use client'
import useModal from '@/hooks/useModal'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { toast } from 'sonner'

export default function DeleteTask() {
    const modal = useModal()
    const params = useParams()
    const queryClient = useQueryClient()
  
    const { id } = params
    
  
    const mutation = useMutation({
        mutationFn: () => {
            return fetch(`/api/tasks/${modal.taskId}`,
                {
                    method: 'DELETE'
                }
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['board', id] })
            modal.onClose('deleteTask')
            modal.setTaskId(null)
            toast.success('Task successfully deleted')
        },
        onError: (error) => {
            console.error(error)
            toast.error("An error occured while deleting the task, please try again")
        }
    })
    if (!modal.modals.deleteTask) {
        return null;
    }
  
    return (
        <div className='fixed bg-neutral-800 bg-opacity-70 h-full w-full overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center'>
            <div className='p-4 flex flex-col justify-center bg-white gap-4 relative rounded-lg w-3/4 lg:w-1/2 max-w-xl'>
                <h1 className='text-mainRed text-lg font-semibold'>Delete this task ?</h1>
                <p className='text-neutral-400 max-w-md'>Are you sure you want to delete this task? The action will remove all columns and tasks and cannot be reversed.</p>

                <div className='flex items-center justify-center gap-4 w-full'>
                    <Button
                        onClick={() => mutation.mutate()}
                        className="rounded-full bg-mainRed w-full hover:bg-secondRed">Delete</Button>
                    <Button
                        onClick={() => modal.onClose('deleteTask')}
                        className="rounded-full bg-blueGrayish w-full hover:opacity-90 text-black hover:text-white dark:hover:bg-lightGray dark:hover:text-black">Cancel</Button>
                </div>

            </div>
        </div>
    )
}
