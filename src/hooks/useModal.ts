import { useState } from "react";
import { IModal } from "../types";

export const useModal = () => {
	const [modals, setModals] = useState<IModal>({ isModalOpen: false, currentId: ''});

	const openModal = (modalKey: string, id?: string) => {
		setModals((prevModals) => ({
			...prevModals,
			[modalKey]: {
				isModalOpen: true,
				currentId: id ?? '',
			},
		}));
	};

	const closeModal = (modalKey: string) => {
		setModals((prevModals) => ({
			...prevModals,
			[modalKey]: { isModalOpen: false, currentId: '' },
		}));
	};

	return {
		modals,
		openModal,
		closeModal,
	};
};

// export const useModal = () => {
// 	const [isModalOpen, setisModalOpen] = useState<boolean>(false)
// 	const [currentId, setcurrentId] = useState<string>('');

// 	const toggleModal = (id: string) => {
// 		setisModalOpen(!isModalOpen)
// 		setcurrentId(id ?? '')
// 	}

// 	return {
// 		isModalOpen,
// 		currentId,
// 		toggleModal
// 	}
// }