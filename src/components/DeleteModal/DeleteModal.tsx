import { Modal } from 'antd';
interface DeleteModalProps {
  onDelete: () => void;
  onCancel: () => void;
}

export const DeleteModal = (props: DeleteModalProps) => {
  const { onDelete, onCancel } = props;

  return (
    <Modal
      title="WARNING"
      open={true}
      onOk={onDelete}
      onCancel={onCancel}
    >
      <p>Do you really want to delete this task?</p>
    </Modal>
  );
};
