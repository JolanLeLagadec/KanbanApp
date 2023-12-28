
import Layout from '@/components/layout/Layout'
import AddNewBoard from '@/components/modals/AddNewBoard'
import AddNewTask from '@/components/modals/AddNewTask'
import DeleteBoard from '@/components/modals/DeleteBoard'
import DeleteTask from '@/components/modals/DeleteTask'
import Taskmodal from '@/components/modals/TaskModal'

export default function LayoutBoards({ children }) {

  return (
    <div> 
      <DeleteTask />
      <Taskmodal />
      <DeleteBoard />
      <AddNewTask />
      <AddNewBoard />  
        <Layout>
          {children}
        </Layout>   
    </div>
  )
}
