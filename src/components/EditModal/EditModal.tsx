import { DatePicker, Form, Input, Modal } from 'antd';
import { IModal, IToDo } from '../../types';
import dayjs from 'dayjs';
import * as css from './style.css';
import { isModalOpen } from '../../utils/isModalOpen';

interface EditModalProps {
  modal: IModal;
  onEdit: (updatedTodo: IToDo) => void;
  onCancel: () => void;
}

export const EditModal = (props: EditModalProps) => {
  const { modal, onEdit, onCancel } = props;
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onEdit({
      date: values.date,
      content: values.todo,
      isComplete: false,
    });
    form.resetFields();
  };

  return (
    <Modal
      title={<div style={{ marginBottom: '16px' }}>TASK EDITING</div>}
      open={isModalOpen(modal)}
      onOk={() => form.submit()}
      onCancel={onCancel}
    >
      <Form
        className={css.formSection}
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          date: dayjs(),
        }}
      >
        <Form.Item
          className={css.formItem}
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please select a date!' }]}
          labelCol={{ span: 24 }}
        >
          <DatePicker
            format="DD.MM.YYYY"
            suffixIcon={null}
            allowClear={false}
          />
        </Form.Item>

        <Form.Item
          name="todo"
          label="Description"
          rules={[{ required: true, message: 'Please enter a TODO!' }]}
          labelCol={{ span: 24 }}
        >
          <Input placeholder="Create a second masterpiece" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
