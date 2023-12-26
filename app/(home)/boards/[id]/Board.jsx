'use client'


import { getBoard } from '@/actions/boards'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'
import Column from './Column'

export default function Board({ boardId }) {

    const { data } = useQuery({
        queryKey: ['board', boardId],
        queryFn: () => getBoard(boardId)
    })
    const ref = useRef(null);

    useEffect(() => {
        const div = ref.current;
        let isDown = false;
        let startX;
        let scrollLeft;

        const mouseDownHandler = (e) => {
            isDown = true;
            startX = e.pageX - div.offsetLeft;
            scrollLeft = div.scrollLeft;
        };

        const mouseLeaveHandler = () => {
            isDown = false;
        };

        const mouseUpHandler = () => {
            isDown = false;
        };

        const mouseMoveHandler = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - div.offsetLeft;
            const walk = (x - startX) * 2; // Multiplier for sensitivity
            div.scrollLeft = scrollLeft - walk;
        };

        div.addEventListener('mousedown', mouseDownHandler);
        div.addEventListener('mouseleave', mouseLeaveHandler);
        div.addEventListener('mouseup', mouseUpHandler);
        div.addEventListener('mousemove', mouseMoveHandler);

        return () => {
            div.removeEventListener('mousedown', mouseDownHandler);
            div.removeEventListener('mouseleave', mouseLeaveHandler);
            div.removeEventListener('mouseup', mouseUpHandler);
            div.removeEventListener('mousemove', mouseMoveHandler);
        };
    }, []);

  
    return (
        <div ref={ref} className='p-4 w-full min-h-[91vh] overflow-hidden'>
            <div className='grid grid-flow-col auto-cols-max h-auto space-x-7 ' >
                {
                    data?.column.map((column) => (
                        <div key={column.id} className='w-[21rem]'>
                            <Column column={column} />   
                        </div>
                    ))
                }
                <button className='h-full bg-white dark:bg-neutral-800 rounded-lg px-4'>
                    <h1 className='text-xl font-semibold text-neutral-600 dark:text-neutral-100'><span>+</span>Create new column</h1>
                </button>
            </div>
        </div>
    )
}
