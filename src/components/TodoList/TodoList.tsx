import { useToDos } from '../../hooks/useToDos';
import { IMainForm, IToDo } from '../../types';
import '../../global.css';
import { TodoCard } from '../TodoCard/TodoCard';
import * as css from './style.css';
import { MainForm } from '../MainForm/MainForm';
import { TodoController } from '../TodoController/TodoController';
import { useModal } from '../../hooks/useModal';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import { EditModal } from '../EditModal/EditModal';
import { Button, Checkbox, Flex, List, Space } from 'antd';
import { Period, useTodoFilters } from '../../hooks/useTodoFilters';
import { DateNavigator } from '../DateNavigator/DateNavigator';

const TODO_MODALS = {
  delete: DeleteModal,
  edit: EditModal,
};

export const TodoList = () => {
  const { todos, addTodo, updateTodo, deleteTodo } = useToDos();
  const { modals, openModal, closeModal } = useModal();
  const { filteredTodos, filterCompleted, filterPeriod, setFilterCompleted, setFilterPeriod, currentDate, setCurrentDate } = useTodoFilters(
    Array.from(todos)
  );

  const createTodo = (values: IMainForm) => {
    const { date, todo } = values;
    const newTodo: IToDo = {
      date,
      content: todo,
      isComplete: false,
    };
    addTodo(newTodo);
  };

  const handleDelete = (id: string) => {
    deleteTodo(id);
    closeModal('delete');
  };

  const handleEdit = (id: string, updatedTodo: IToDo) => {
    updateTodo(id, updatedTodo);
    closeModal('edit');
  };

	console.log('todos :=>', todos)

  return (
    <>
      <List
        className={css.todoContainer}
        header={
          <>
            <Flex
              className={css.completedTasks}
              align="center"
              justify="space-between"
            >
              <h1>My todo list</h1>
              <div>
                <Checkbox
                  checked={filterCompleted}
                  onChange={e => setFilterCompleted(e.target.checked)}
                />
                <span>Show completed tasks:</span>
              </div>
            </Flex>
            <MainForm onSubmit={createTodo} />
          </>
        }
        footer={
          todos.size !==0 ? (
						<Flex align='center' justify='space-between'>
						<Space className={css.filterBtnContainer}>
							<Button
								onClick={() => setFilterPeriod(Period.DAY)}
								color="default"
								variant="filled"
							>
								Day
							</Button>
							<Button
								onClick={() => setFilterPeriod(Period.WEEK)}
								color="default"
								variant="filled"
							>
								Week
							</Button>
							<Button
								onClick={() => setFilterPeriod(Period.MONTH)}
								color="default"
								variant="filled"
							>
								Month
							</Button>
          	</Space>
						{filterPeriod === 'day' && <DateNavigator currentDate={currentDate} setCurrentDate={setCurrentDate}/>}
					</Flex>
					) : null
        }
      >
        {filteredTodos.map(([id, todo]) => {
          return (
            <TodoController
              key={id}
              todo={todo}
              setTodo={todo => updateTodo(id, todo)}
            >
              {props => (
                <TodoCard
                  {...props}
                  onDelete={() => openModal('delete', id)}
                  onEdit={() => openModal('edit', id)}
                />
              )}
            </TodoController>
          );
        })}
      </List>

      {Object.entries(TODO_MODALS).map(([key, ModalComponent]) => {
        const modal = modals[key];
        if (!modal?.isModalOpen) return null;

        return (
          <ModalComponent
            key={key}
            isModalOpen={modal.isModalOpen}
            currentId={modal.currentId}
            onDelete={() => handleDelete(modal.currentId!)}
            onEdit={(updatedTodo: IToDo) => handleEdit(modal.currentId!, updatedTodo)}
            onCancel={() => closeModal(key)}
          />
        );
      })}
    </>
  );
};
