import { create } from "zustand"

const useEllipsisMenu = create((set) => ({
    isOpen: false,
    onOnpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

export default useEllipsisMenu