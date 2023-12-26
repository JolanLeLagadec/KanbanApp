import React, { useState } from 'react'
import {
    DropdownMenu, DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import useModal from '@/hooks/useModal'
import { Delete, Edit2, MoreHorizontal } from 'lucide-react'

export default function MenuTaskModal({ onEdit }) {
    const modal = useModal()
    return (
        <div className='lg:mr-6 mt-2'>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <button >
                        <MoreHorizontal />
                          
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                            <DropdownMenuItem className="cursor-pointer">
                                <button
                                onClick={onEdit} 
                                className='flex gap-2 items-center'>
                                <Edit2 className="mr-2 h-4 w-4" />
                                <span>Edit task</span>
                                </button>
                            </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <div
                                onClick={() => {
                                    modal.onClose('seeTask') 
                                    modal.onOpen('deleteTask') }}
                                className='flex items-center gap-2'>
                                <Delete className='h-4 w-4' />
                                <span>Delete task</span>
                            </div>

                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
