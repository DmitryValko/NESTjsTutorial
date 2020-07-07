import { IUser } from 'src/User/Interface/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class UserService {

    private salt: Number

    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>
    ) {
        this.salt = 10;
    }

    get modelUser(): Model<IUser> {
        return this.userModel;
    }

    async create(user: CreateUserDTO): Promise<IUser> {
        if (user.password.toString() !== user.password2.toString()) throw new HttpException('User passport dont correct!', HttpStatus.NOT_FOUND);
        const hash: string = await bcrypt.hash(user.password, this.salt);
        const newUser = new this.userModel({
            name: user.name,
            email: user.email,
            password: hash,
            tokens: []
        });
        return await newUser.save();
    }

    async checkUser(email: string, password: string): Promise<IUser | null> {
        const user = await this.userModel.findOne({ email });
        if (!user) return null;
        const pass = await this.checkPassword(password, user.password);
        if (!pass) return null;
        return user;
    }

    async checkPassword(password: string, reqPassword: string): Promise<Boolean> {
        const match = await bcrypt.compare(reqPassword, password);
        return match;
    }

};