import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from "./Auth/auth.module";
import { UserModule } from "./User/user.module";
import { TodoModule } from "./Todo/todo.module";



@Module({
    imports: [
        TodoModule,
        AuthModule,
        UserModule,
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    ],
})

export class AppModule { }