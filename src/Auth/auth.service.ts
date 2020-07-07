import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { IUser } from 'src/User/Interface/user.interface';
import { UserService } from "src/User/user.service";
import { LoginUserDTO } from 'src/User/dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ) { }

    async loginFromToken(userId: string): Promise<IUser | null> {
        const user = await this.userService.modelUser.findById(userId);
        return user ? user : null;
    }

    async loginUser(email: string, password: string): Promise<IUser> | null {
        const user = await this.userService.modelUser.findOne({ email });
        if (!user) return null; //throw new HttpException('User with this email does not exist!', HttpStatus.NOT_FOUND);
        const validationPassword = await this.userService.checkPassword(user.password, password);
        if (!validationPassword) return null; // throw new HttpException('User password dont correct!', HttpStatus.NOT_FOUND);
        return user;
    }

    async logOutUser(userId: string, refToken: string): Promise<Boolean> {
        const user = await this.userService.modelUser.findById(userId);
        if (!user) return false; 
        await user.removeToken(refToken);
        return true;
    }



}