import { useState } from 'react';
import { IToDo } from '../types';
import { generateKey } from '../utils/generateKey';
import { TodoNotFound } from '../errors';

export const useToDos = () => {
  const [todos, settodos] = useState<Map<string, IToDo>>(new Map());

  const addTodo = (todo: IToDo) => {
    const id = generateKey();
    settodos(prevTodos => new Map([...prevTodos, [id, todo]]));
    return id;
  };

  const updateTodo = (id: string, todo: IToDo) => {
    settodos(prevTodos => {
      if (!prevTodos.has(id)) throw new TodoNotFound(id);
      return new Map([...prevTodos, [id, todo]]);
    });
  };

  const deleteTodo = (id: string) => {
    settodos(prevTodos => {
      const todos = new Map(prevTodos);
      todos.delete(id);
      return todos;
    });
  };

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
};
