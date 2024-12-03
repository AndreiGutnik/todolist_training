export const TodoNotFound=(id: string) => {
	throw new Error(`ToDo with ID ${id} not found`)
}