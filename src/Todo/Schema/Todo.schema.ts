import * as mongoose from 'mongoose';
import { ITodo, ITodoItem } from '../interface/todo.interface';
import { async } from 'rxjs/internal/scheduler/async';
import { TodoCreateDTO } from '../dto/todo.dto';
import { ITodoChange } from '../interface/todo.change';


const TodoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    todos: [
        {
            task: {
                type: String,
                required: true
            },
            check: {
                type: Boolean,
                required: true
            },
            dateCreate: {
                type: String
            },
            dateSoon: {
                type: String
            }
        }
    ]
});


TodoSchema.methods.addTodo = async function (todo: TodoCreateDTO): Promise<Boolean> {
    try {
        const todos = [...this.todos];
        todos.push(todo);
        this.todos = todos;
        await this.save();
        return true;
    } catch (e) {
        return false;
    }
}

TodoSchema.methods.deleteTodo = async function (todoId: String): Promise<Boolean> {
    try {
        const todos = [...this.todos];
        this.todos = todos.filter(item => item._id.toString() !== todoId.toString());
        await this.save();
        return true;
    } catch (e) {
        return false;
    }
}

TodoSchema.methods.changeTodo = async function (newTodo: ITodoChange): Promise<Boolean> {
    try {
        const todos = [...this.todos];
        const newTodos = todos.map(item => {
            if (item._id.toString() === newTodo._id.toString()) {
                return newTodo;
            }
            return item;
        })
        this.todos = newTodos;
        await this.save();
        return true;
    } catch (e) {
        return false;
    }
}

export {
    TodoSchema
}