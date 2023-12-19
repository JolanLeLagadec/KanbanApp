import { create } from "zustand"

const useBoardsMenu = create((set, get) => ({
    isOpen: false,
    setIsOpen: () => set({isOpen: !get().isOpen})
}))

export default useBoardsMenu