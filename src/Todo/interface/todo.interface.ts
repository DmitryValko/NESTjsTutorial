import { Document } from "mongoose";
import { TodoCreateDTO } from "../dto/todo.dto";
import { ITodoChange } from "./todo.change";

export interface ITodoItem {
    readonly task: String
    readonly check: Boolean
    readonly dataCreate: String
    readonly dateSoon?: String
}

export interface ITodo extends Document {
    readonly userId: String
    readonly todos: ITodoItem[]
    readonly addTodo: (todo: TodoCreateDTO) => Promise<Boolean>
    readonly deleteTodo: (todoId: String) => Promise<Boolean>
    readonly changeTodo: (newTodo: ITodoChange) => Promise<Boolean>
}

