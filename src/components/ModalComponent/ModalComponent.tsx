import { IModal, IToDo } from '../../types';
import { isModalOpen } from '../../utils/isModalOpen';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import { EditModal } from '../EditModal/EditModal';

export enum TodoModalType {
  DELETE = 'delete',
  EDIT = 'edit',
}

type DeleteCallback = (id: string) => void;

type EditCallback = (id: string, updatedTodo: IToDo) => void;

const TODO_MODAL_COMPONENTS = {
  [TodoModalType.DELETE]: (modal: IModal, callback: DeleteCallback, onCancel: () => void) => (
    <DeleteModal
      modal={modal}
      onDelete={() => callback(modal.currentId)}
      onCancel={onCancel}
    />
  ),
  [TodoModalType.EDIT]: (modal: IModal, callback: EditCallback, onCancel: () => void) => (
    <EditModal
      modal={modal}
      onEdit={(updatedTodo: IToDo) => callback(modal.currentId, updatedTodo)}
      onCancel={onCancel}
    />
  ),
};

interface ModalComponentProps {
  modals: { [key: string]: IModal };
  closeModal: (TodoModalType) => void;
  updateTodo: (id: string, updatedTodo: IToDo) => void;
  deleteTodo: (id: string) => void;
}

export const ModalComponent = ({
  modals,
  closeModal,
  updateTodo,
  deleteTodo,
}: ModalComponentProps) => {
  const handleDelete = (id: string) => {
    deleteTodo(id);
    closeModal(TodoModalType.DELETE);
  };

  const handleEdit = (id: string, updatedTodo: IToDo) => {
    updateTodo(id, updatedTodo);
    closeModal(TodoModalType.EDIT);
  };

  const TODO_COLLBACK = {
    [TodoModalType.DELETE]: handleDelete,
    [TodoModalType.EDIT]: handleEdit,
  };

  return (
    <>
      {Object.entries(TODO_MODAL_COMPONENTS).map(([key, ModalComponent]) => {
        const modal = modals[key as TodoModalType];
        if (!isModalOpen(modal)) return null;

        const modalElement = ModalComponent(modal, TODO_COLLBACK[key], () =>
          closeModal(key as TodoModalType)
        );

        return <div key={key}>{modalElement}</div>;
      })}
    </>
  );
};
