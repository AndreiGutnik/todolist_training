import { Button, DatePicker, Form, Input } from "antd"
import * as css from './style.css'
import dayjs from 'dayjs'
import { IMainForm } from "../../types"

interface MainFormProps {
	onSubmit: (values: IMainForm)=>void
}

export const MainForm = (props: MainFormProps)=>{
	const [form] = Form.useForm()

	const handleSubmit = (values: IMainForm) => {
    props.onSubmit(values)
    form.resetFields();
  };

	return(
		<>
		<Form
			className={css.mainForm}
			form={form}
			onFinish={handleSubmit}
			initialValues={{
				date: dayjs()
			}}
		>
			<Form.Item
				className={css.date}
				name="date"
				rules={[{ required: true, message: "Please select a date!" }]}
			>
				<DatePicker
					format="DD.MM.YYYY"
					suffixIcon={null}
					allowClear={false}
				/>
			</Form.Item>

			<Form.Item
				className={css.todo}
				name="todo"
				rules={[{ required: true, message: "Please enter a TODO!" }]}
			>
				<Input placeholder="What do you need TODO?" />
			</Form.Item>

			<Button type="primary" htmlType="submit">
				Submit
			</Button>
		</Form>
		</>
	)
}