'use client'
import useModal from '@/hooks/useModal'
import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { toast } from 'sonner'

export default function DeleteBoard() {
    const modal = useModal()
    const params = useParams()
    const queryClient = useQueryClient()
    const router = useRouter()

    const { id } = params

    const { data } = useQuery({
        queryKey: ['boardName', id],
        queryFn: () => getBoard(id),
        enabled: modal.modals.deleteBoard // composants montés au même moment, peut entrainer des conflits par rapport à la maj du cache si on utilise la même clé ( course de condition ). On signifie donc de requeter que lorsque la modale est ouverte.
    })
  
    const mutation = useMutation({
        mutationFn: () => {
            return fetch(`/api/boards/${id}`,
                {
                    method: 'DELETE'
                }
            )
        },
        onSuccess: (res) => {
            if(!res.ok){
                throw new Error('Error while deleting, try again')
            }
            queryClient.invalidateQueries({ queryKey: ['getMenu'] })
            modal.onClose('deleteBoard')
            toast.success('Board successfully deleted')
            router.push('/boards')
           
        },
        onError: (error) => {
            console.error(error)
            toast.error("An error occured while deleting the board, please try again")
        }
    })
    if (!modal.modals.deleteBoard) {
        return null;
    }
  
    return (
        <div className='fixed bg-neutral-800 bg-opacity-70 h-full w-full overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center'>
            <div className='p-4 flex flex-col justify-center bg-white gap-4 relative rounded-lg w-3/4 lg:w-1/2 max-w-xl'>
                <h1 className='text-mainRed text-lg font-semibold'>Delete this board ?</h1>
                <p className='text-neutral-400 max-w-md'>Are you sure you want to delete the &apos;{data?.name}&apos; board? The action will remove all columns and tasks and cannot be reversed.</p>

                <div className='flex items-center justify-center gap-4 w-full'>
                    <Button
                        onClick={() => mutation.mutate()}
                        className="rounded-full bg-mainRed w-full hover:bg-secondRed">Delete</Button>
                    <Button
                        onClick={() => modal.onClose('deleteBoard')}
                        className="rounded-full bg-blueGrayish w-full hover:opacity-90 text-black hover:text-white dark:hover:text-black">Cancel</Button>
                </div>

            </div>
        </div>
    )
}
