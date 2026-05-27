import { create } from "zustand"

export const useOpenModal = create(set => ({
	isOpen: true,
	onClose: () => set({isOpen: false}),
	onOpen: () => set({isOpen: true})
}))

