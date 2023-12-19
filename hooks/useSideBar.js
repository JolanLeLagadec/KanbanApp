import { create } from "zustand"

const useSideBar = create((set, get) => ({
    isOpen: true,
    setIsOpen: () => set({isOpen: !get().isOpen})
}))

export default useSideBar