import { IUser } from 'src/User/Interface/user.interface';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/User/user.service';
import * as jwt from 'jsonwebtoken';
import * as uuid from 'uuid';
import { JwtPayload } from './Interface/token.interface';


@Injectable()
export class TokenService {
    constructor(
        private readonly userService: UserService
    ) { }

    createAccessToken(user: IUser): string {
        const { name, _id, email } = user;
        return jwt.sign({ name, _id, email }, 'secretKey', { expiresIn: '10m' })
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.userService.modelUser.findById(payload._id);
    }

    async removeRefreshToken(refToken: string, user: IUser): Promise<void> {
        await user.removeToken(refToken);
    }

    async checkRefreshToken(refreshToken: string, user: IUser): Promise<Boolean> {
        return await user.checkToken(refreshToken);
    }

    async addRefreshToken(user: IUser): Promise<string> {
        const refreshToken = uuid.v4() + '-' + uuid.v4();
        await user.addRefreshToken(refreshToken);
        return refreshToken;
    }

    async outRefreshTokenFromToken(user: IUser, token: string): Promise<void> {
        await user.removeToken(token);
    }

    async outAllRefreshToken(user: IUser, token: string): Promise<void> {
        await user.removeAllToken();
    }
}