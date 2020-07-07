import { TokenService } from 'src/Token/token.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtPayload } from 'src/Token/Interface/token.interface';
import { IUser } from 'src/User/Interface/user.interface';


@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secretKey',
            passReqToCallback: true,
        });
    }

    // const checkToken = (Date.now() / 1000) < +decodToken.iat;
    // console.log(checkToken);

    async validate(req: Request, decodToken: JwtPayload, done: Function): Promise<Function> {
        const user: Promise<IUser> = this.authService.loginFromToken(decodToken._id);
        if (!user) return done(new UnauthorizedException(), false);
        return done(null, user);
    }



}