import React from 'react'
import  iconBoard  from '@/starter-code/assets/icon-board.svg'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import useModal from '@/hooks/useModal'

// Au click sur le bouton on envoie à notre hook la valeur true pour un nom donné
// L'idée ensuite c'est que le composant modale soit rendue pour ceux dont le name est true



export default function ButtonCreateNewBoard() {
  const modal = useModal()
  return (
    <div className='w-full'>
    <div className='flex flex-col items-start gap-3 text-white mt-7'>
      <button
       onClick={() => modal.onOpen('createBoard')}
       className=' rounded-r-full pl-6 py-3 w-[95%] font-semibold flex gap-4 items-center dark:hover:bg-neutral-100 transition-colors text-mainPurple hover:bg-neutral-200 '>
      <Image
        src={iconBoard}
        width={20}
        height={15}
        alt='iconboard'
        className=''
         />
         <div className='flex items-center justify-center'>
         <Plus size={16} color="#635FC7" strokeWidth={4} className='mt-1' />
         <h1>Create New Board</h1>
         </div>
      </button>   
    </div>
  </div>
  )
}
