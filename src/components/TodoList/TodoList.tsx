import { useToDos } from '../../hooks/useToDos';
import { IMainForm, IToDo } from '../../types';
import '../../global.css';
import { TodoCard } from '../TodoCard/TodoCard';
import * as css from './style.css';
import { MainForm } from '../MainForm/MainForm';
import { useModal } from '../../hooks/useModal';
import { Button, Checkbox, Flex, List, Space } from 'antd';
import { Period, useTodoFilters } from '../../hooks/useTodoFilters';
import { DateNavigator } from '../DateNavigator/DateNavigator';
import { ModalComponent, TodoModalType } from '../ModalComponent/ModalComponent';

export const TodoList = () => {
  const { todos, addTodo, updateTodo, deleteTodo } = useToDos();
  const { modals, openModal, closeModal } = useModal();
  const {
    filteredTodos,
    filterCompleted,
    filterPeriod,
    setFilterCompleted,
    setFilterPeriod,
    currentDate,
    setCurrentDate,
  } = useTodoFilters(Array.from(todos));

  const createTodo = (values: IMainForm) => {
    const { date, todo } = values;
    const newTodo: IToDo = {
      date,
      content: todo,
      isComplete: false,
    };
    addTodo(newTodo);
  };

  const handleComplete = (id: string, todo: IToDo) => {
    const newtodo = { ...todo, isComplete: !todo.isComplete };
    updateTodo(id, newtodo);
  };

  const renderHeader = () => {
    return (
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
    );
  };

  const renderFooter = () => {
    if (todos.size < 1) return null;
    return (
      <Flex
        align="center"
        justify="space-between"
      >
        <Space className={css.filterBtnContainer}>
          <Button
            onClick={() => setFilterPeriod(Period.DATE)}
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
        <DateNavigator
          picker={filterPeriod}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      </Flex>
    );
  };

  return (
    <>
      <List
        className={css.todoContainer}
        header={renderHeader()}
        footer={renderFooter()}
      >
        <div className={css.listContent}>
          {filteredTodos.map(([id, todo]) => {
            return (
              <TodoCard
                key={id}
                todo={todo}
                onToggleComplete={() => handleComplete(id, todo)}
                onDelete={() => openModal(TodoModalType.DELETE, id)}
                onEdit={() => openModal(TodoModalType.EDIT, id)}
              />
            );
          })}
        </div>
      </List>

      <ModalComponent
        modals={modals}
        closeModal={closeModal}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    </>
  );
};
