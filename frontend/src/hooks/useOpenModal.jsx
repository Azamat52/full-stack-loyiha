import { create } from "zustand"

export const useOpenModal = create(set => ({
	isOpen: false,
	onClose: () => set({isOpen: false}),
	onOpen: () => set({isOpen: true})
}))

