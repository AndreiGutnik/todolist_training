import dayjs from 'dayjs'
import { useMemo, useState } from "react";
import { IToDo } from "../types";

export enum Period {
	DAY='day',
	WEEK='week',
	MONTH= 'month'
}

export const useTodoFilters = (todos: [string, IToDo][]) => {
	const [filterCompleted, setFilterCompleted] = useState<boolean>(false)
	const [filterPeriod, setFilterPeriod] = useState<Period>(Period.DAY);

	const filterByComplete = ([_, todo]: [string, IToDo]) => {
		return filterCompleted ? todo.isComplete : true
	}

	const filterByPeriod = ([_, todo]: [string, IToDo]) => {
		const todoDate = dayjs(todo.date)
    const now = dayjs()
		return todoDate.isSame(now, filterPeriod)
	}

	const filteredTodos = useMemo(() => {
    return todos
		.filter(filterByComplete).filter(filterByPeriod)
		.sort(([_, todoA], [__, todoB]) => {
      return dayjs(todoA.date).valueOf() - dayjs(todoB.date).valueOf()
		})
  }, [todos, filterCompleted, filterPeriod])

	return {
		filteredTodos,
		filterCompleted,
		setFilterCompleted,
		setFilterPeriod,
	}
}