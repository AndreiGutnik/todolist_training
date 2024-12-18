import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { IToDo } from '../types';

export enum Period {
  DATE = 'date',
  WEEK = 'week',
  MONTH = 'month',
}

export const useTodoFilters = (todos: [string, IToDo][]) => {
  const [filterCompleted, setFilterCompleted] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState(Period.DATE);
  const [currentDate, setCurrentDate] = useState(dayjs());

  const filterByComplete = ([_, todo]: [string, IToDo]) => {
    return filterCompleted ? todo.isComplete : true;
  };

  const filterByPeriod = ([_, todo]: [string, IToDo]) => {
    const todoDate = dayjs(todo.date);
    return todoDate.isSame(currentDate, filterPeriod);
  };

  const filteredTodos = useMemo(() => {
    return todos
      .filter(filterByComplete)
      .filter(filterByPeriod)
      .sort(([_, todoA], [__, todoB]) => {
        return dayjs(todoA.date).valueOf() - dayjs(todoB.date).valueOf();
      });
  }, [todos, filterCompleted, filterPeriod]);

  return {
    filteredTodos,
    filterCompleted,
    setFilterCompleted,
    filterPeriod,
    setFilterPeriod,
    currentDate,
    setCurrentDate,
  };
};
