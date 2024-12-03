import { Modal } from 'antd'
import { IModal } from '../../types'

interface DeleteModalProps extends IModal {
	onDelete: ()=>void
	onCancel: ()=>void
}

export const DeleteModal = (props: DeleteModalProps) => {
	const {isModalOpen, onDelete, onCancel} = props

  return isModalOpen ? (
    <Modal
      title="WARNING"
      open={isModalOpen}
      onOk={onDelete}
      onCancel={onCancel}
    >
      <p>Do you really want to delete this task?</p>
    </Modal>
  ) : null
}
