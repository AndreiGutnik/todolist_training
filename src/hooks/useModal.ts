import { useState } from 'react';
import { IModal } from '../types';

export const useModal = () => {
  const [modals, setModals] = useState<{ [key: string]: IModal }>({
    delete: { currentId: '' },
    edit: { currentId: '' },
  });

  const openModal = (modalKey: string, id: string) => {
    setModals(prevModals => ({
      ...prevModals,
      [modalKey]: {
        currentId: id,
      },
    }));
  };

  const closeModal = (modalKey: string) => {
    setModals(prevModals => ({
      ...prevModals,
      [modalKey]: { currentId: '' },
    }));
  };

  return {
    modals,
    openModal,
    closeModal,
  };
};
