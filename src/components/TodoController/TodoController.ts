import { IToDo } from "../../types"

interface RenderFuncProps{
	todo: IToDo
	onEdit: ()=>void
	onComplete: ()=>void
}

interface TodoControllerProps{
	todo: IToDo
	setTodo: (IToDo)=>void
	children: (props: RenderFuncProps)=>React.ReactNode
}

export const TodoController = (props: TodoControllerProps)=>{
	const {todo, setTodo} = props

	const handleEdit = ()=>{}

	const handleComplete = ()=>{
		const newtodo = {...todo, isComplete: todo.isComplete ? false : true}
		setTodo(newtodo)
	}

	return props.children({
		todo,
		onEdit: handleEdit,
		onComplete: handleComplete
	})
}