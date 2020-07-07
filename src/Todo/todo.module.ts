import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './Schema/Todo.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: "Todo", schema: TodoSchema }])],
    controllers: [TodoController],
    providers: [TodoService],
    exports: [TodoService]
})

export class TodoModule { }