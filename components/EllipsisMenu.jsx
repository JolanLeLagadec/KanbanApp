'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import iconEllipsis from '@/starter-code/assets/icon-vertical-ellipsis.svg'
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu'
import {
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Delete, LogOut } from 'lucide-react'
import { SignOutButton } from '@clerk/nextjs'
import useModal from '@/hooks/useModal'

export default function EllipsisMenu() {

    const modal = useModal()

    return (
        <div className='lg:mr-6 mt-2'>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <button>
                            <Image
                                src={iconEllipsis}
                                width={8}
                                height={5}
                                alt='iconadd'
                            />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <SignOutButton>
                            <DropdownMenuItem className="cursor-pointer">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </SignOutButton>
                        <DropdownMenuItem className="cursor-pointer">
                            <div
                                onClick={() => modal.onOpen('deleteBoard')}
                                className='flex items-center gap-2'>
                                <Delete className='h-4 w-4' />
                                <span>Delete board</span>
                            </div>

                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
