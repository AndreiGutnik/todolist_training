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
import { Button, Checkbox, Flex, List } from 'antd';
import { useState } from 'react';

const TODO_MODALS = {
  delete: DeleteModal,
  edit: EditModal,
};

export const TodoList = () => {
  const [completedTsks, setCompletedTsks] = useState<boolean>(false);
  const { todos, addTodo, updateTodo, deleteTodo } = useToDos();
  const { modals, openModal, closeModal } = useModal();

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
                  checked={completedTsks}
                  onChange={e => setCompletedTsks(e.target.checked)}
                />
                <span>Show completed tasks:</span>
              </div>
            </Flex>
            <MainForm onSubmit={createTodo} />
          </>
        }
        footer={
					<div className={css.filterBtnContainer}>
						<Button color="default" variant="filled">Day</Button>
						<Button color="default" variant="filled">Week</Button>
						<Button color="default" variant="filled">Month</Button>
					</div>
				}
      >
				{Array.from(todos)
            .filter(([_, todo]) => (completedTsks ? todo.isComplete : true))
            .map(([id, todo]) => {
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
