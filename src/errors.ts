export class TodoNotFound extends Error {
	constructor(id: string){
		super(`ToDo with ID ${id} not found`)
	}
}
