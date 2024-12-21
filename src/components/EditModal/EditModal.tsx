import { DatePicker, Form, Input, Modal } from 'antd';
import { IToDo } from '../../types';
import * as css from './style.css';

interface EditModalProps {
  todo: IToDo;
  onEdit: (updatedTodo: IToDo) => void;
  onCancel: () => void;
}

export const EditModal = (props: EditModalProps) => {
  const { todo, onEdit, onCancel } = props;
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onEdit({
      ...values,
      isComplete: false,
    });
    form.resetFields();
  };

  return (
    <Modal
      title={<div style={{ marginBottom: '16px' }}>TASK EDITING</div>}
      open={true}
      onOk={() => form.submit()}
      onCancel={onCancel}
    >
      <Form
        className={css.formSection}
        form={form}
        onFinish={handleSubmit}
        initialValues={todo}
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
          name="content"
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
