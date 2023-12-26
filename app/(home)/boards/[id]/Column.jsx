import React from 'react'
import Task from './Task'

export default function Column({ column }) {

  const { task: tasks } = column
 
  return (
    <div className=''>
      <div className='flex gap-2 items-center'>
        <div className='rounded-full w-4 h-4 bg-green-300'></div>
      <h1 className='text-lg uppercase tracking-widest'>{column.name}</h1>
      </div>
      
      {
        tasks.map((task) => (
          <div key={task.id} className='grid grid-flow-row '>
            <Task task={task} />
          </div>
        ))
      }
    </div>
  )
}


