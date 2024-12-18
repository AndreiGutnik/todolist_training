import { IToDo } from '../../types';
import { Tag, Flex } from 'antd';
import * as css from './style.css';
import Card from 'antd/es/card/Card';
import Meta from 'antd/es/card/Meta';

interface TodoCardProps {
  todo: IToDo;
  onToggleComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const TodoCard = (props: TodoCardProps) => {
  const { todo, onToggleComplete, onEdit, onDelete } = props;

  return (
    <Card
      className={css.todoCard}
      styles={{
        body: { padding: '12px' },
      }}
      actions={[
        <p onClick={onToggleComplete}>{todo.isComplete ? 'inComplete' : 'Complete'}</p>,
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
