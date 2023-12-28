import { create } from 'zustand'

 const useModal = create((set) => ({
    
   modals: {
    createBoard: false,
    createTask: false,
    editBoard: false,
    editTask: false,
    deleteBoard: false,
    deleteTask: false,
    seeTask: false
   },
   taskId: null,
   setTaskId: (id) => set({taskId: id}),
   onOpen: (modalName) => set(state => ({
        modals: {...state.modals, [modalName]: true}
   })),
   onClose: (modalName) => set(state => ({
        modals: {...state.modals, [modalName]: false}
   }))
}))

export default useModal