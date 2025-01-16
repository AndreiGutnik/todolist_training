import { useState } from 'react';
import { generateKey } from '../../utils/generateKey';
import { HideModelFunc, ModelId, OpenModalFunc } from './types';
import React from 'react';

export const useModals = () => {
  const [modals, setModal] = useState(new Map<ModelId, React.ReactNode>());

  const hideModal: HideModelFunc = modalId => {
    setModal(currentModels => {
      const nextModels = new Map(currentModels);
      nextModels.delete(modalId);
      return nextModels;
    });
  };

  const openModal: OpenModalFunc = getModelContent => {
    const modalId = generateKey();

    const hideSpecificModal = () => {
      hideModal(modalId);
    };

    const modalContent = getModelContent(hideSpecificModal);

    setModal(currentModels => {
      const nextModels = new Map(currentModels);
      nextModels.set(modalId, <React.Fragment key={modalId}>{modalContent}</React.Fragment>);
      return nextModels;
    });
  };

  return {
    modals: Array.from(modals.values()),
    openModal,
  };
};
