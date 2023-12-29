
import Task from './Task'



export default function Column({ column }) {


  const { task: tasks } = column
  
  return (
    <div className=''>
      <div className='flex gap-2 items-center'>
        <div style={{backgroundColor: column.color}} className={`rounded-full w-4 h-4 `}></div>
      <h1 className='text-lg uppercase tracking-widest font-light text-neutral-500 dark:text-neutral-300'>{column.name}</h1>
      </div> 
      {
        tasks.map((task, index) => ( 
          <div  key={task.id} className='grid grid-flow-row '>
            <Task  task={task} index={index} />
          </div>
        ))
      }
    </div>
  )
}


