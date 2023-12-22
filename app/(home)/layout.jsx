
import Layout from '@/components/layout/Layout'
import AddNewBoard from '@/components/modals/AddNewBoard'
import AddNewTask from '@/components/modals/AddNewTask'
import React from 'react'


export default function LayoutBoards({ children }) {

  return (
    <div>
      <AddNewTask />
      <AddNewBoard />  
        <Layout>
          {children}
        </Layout>
     
     
    </div>
  )
}
