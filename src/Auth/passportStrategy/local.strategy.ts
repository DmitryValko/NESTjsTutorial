import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { AuthService } from '../auth.service';



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        });
    }

    async validate(email: string, password: string, done: Function): Promise<Function> {
        const user = await this.authService.loginUser(email, password);
        if (!user) {
            return done(new UnauthorizedException('Dont correct password or email!'), false);
        }
        return done(null, user, false);
    }


}