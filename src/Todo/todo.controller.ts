import { JwtAuthGuard } from './../Auth/Guards/JWT-auth.guard';
import { Controller, Get, Res, UseGuards, Req, Post, Body, ValidationPipe, Delete, Param } from "@nestjs/common";
import { Response, Request } from "express";
import { TodoService } from './todo.service';
import { TodoCreateDTO } from './dto/todo.dto';
import { ITodoChange } from './interface/todo.change';

@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController {

    constructor(
        private readonly todoService: TodoService
    ) { }

    @Get('getAll')
    async getItems(@Req() req, @Res() res: Response) {
        if (req && req.user && req.user._id) {
            const todos = await this.todoService.getTodos(req.user._id);
            res.status(200).json({ "todos": todos })
        }
    }

    @Post('create')
    async createTodo(@Req() req, @Body(ValidationPipe) newtodo: TodoCreateDTO, @Res() res: Response) {
        if (req && req.user && req.user._id) {
            const todo = await this.todoService.getTodosByUserId(req.user._id);
            await this.todoService.create(newtodo, todo);
            res.status(200).json({ "todos": todo.todos })
        }
    }

    @Post('change')
    async ChangeTodoItem(@Req() req, @Body() newTodo: ITodoChange, @Res() res: Response) {
        if (req && req.user && req.user._id) {
            const todo = await this.todoService.getTodosByUserId(req.user._id);
            await this.todoService.changeTodoItem(newTodo, todo);
            res.status(200).json({ "message": "success" })
        }
    }

    @Delete('delete:id')
    async deleteTodoItem(@Param('id') id: string, @Req() req, @Res() res: Response) {
        if (req && req.user && req.user._id) {
            const todo = await this.todoService.getTodosByUserId(req.user._id);
            await this.todoService.deleteTodoItem(id, todo);
            res.status(200).json({ "message": "success" })

        }
    }



}