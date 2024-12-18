import { Modal } from 'antd';
import { IModal } from '../../types';
import { isModalOpen } from '../../utils/isModalOpen';

interface DeleteModalProps {
  modal: IModal;
  onDelete: () => void;
  onCancel: () => void;
}

export const DeleteModal = (props: DeleteModalProps) => {
  const { modal, onDelete, onCancel } = props;

  return (
    <Modal
      title="WARNING"
      open={isModalOpen(modal)}
      onOk={onDelete}
      onCancel={onCancel}
    >
      <p>Do you really want to delete this task?</p>
    </Modal>
  );
};
