import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITodo, ITodoItem } from './interface/todo.interface';
import { IUser } from '../User/Interface/user.interface';
import { CreateUserDTO } from 'src/User/dto/create-user.dto';
import { TodoCreateDTO } from './dto/todo.dto';
import { ITodoChange } from './interface/todo.change';

@Injectable()
export class TodoService {
    constructor(
        @InjectModel('Todo') private readonly todoModel: Model<ITodo>
    ) { }

    async getTodosByUserId(userId: string): Promise<ITodo> {
        const todos = (await this.todoModel.findOne({ userId }));
        if (!todos) {
            const todo = new this.todoModel({ userId, todos: [] });
            await todo.save();
        }
        const todo = await this.todoModel.findOne({ userId });
        return todo;
    }

    async getTodos(userId: string): Promise<ITodoItem[]> {
        const todo = await this.getTodosByUserId(userId);
        return todo.todos;
    }

    async create(newTodoItem: TodoCreateDTO, todo: ITodo) {
        await todo.addTodo(newTodoItem);
        return todo.todos;
    }

    async changeTodoItem(newTodo: ITodoChange, todo: ITodo) {
        await todo.changeTodo(newTodo);
        return todo.todos;
    }

    async deleteTodoItem(id:string, todo:ITodo) {
        await todo.deleteTodo(id);
        return todo.todos;
    }

}