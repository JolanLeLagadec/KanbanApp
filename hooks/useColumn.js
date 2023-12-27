import { create } from "zustand"

const useSideBar = create((set) => ({
    isNewColumn: false,
    setIsOpen: () => set(state => ({isNewColumn: !state.isNewColumn}))
}))

export default useSideBar