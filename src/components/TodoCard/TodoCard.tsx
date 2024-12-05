import { IToDo } from '../../types';
import { Tag, Card, Flex } from 'antd';
import * as css from './style.css';
import { DeleteModal } from '../DeleteModal/DeleteModal';

const { Meta } = Card;

interface TodoCardProps {
	todo: IToDo;
	onComplete: () => void;
	onEdit: () => void;
	onDelete: () => void;
}

export const TodoCard = (props: TodoCardProps) => {
	const { todo, onComplete, onEdit, onDelete } = props;

	return (
		<Card
			className={css.todoCard}
			styles={{
				body: { padding: '12px' },
			}}
			actions={[
				<p onClick={onComplete}>{todo.isComplete ? 'inComplete' : 'Complete'}</p>,
				<p onClick={onEdit}>Edit</p>,
				<p onClick={onDelete}>Delete</p>,
			]}
		>
			<Flex
				align="center"
				justify="space-between"
				gap={'8px'}
			>
				<Flex
					align="center"
					justify="start"
					gap={'8px'}
				>
					{todo.isComplete && (
						<Tag
							className={css.tag}
							color="green"
						>
							DONE
						</Tag>
					)}
					<div>{todo.content}</div>
				</Flex>
				<Meta description={<div>{todo.date.format('DD.MM.YYYY')}</div>} />
			</Flex>
		</Card>
	);
};
