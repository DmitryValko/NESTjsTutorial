import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/User/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passportStrategy/local.strategy';
import { UserModule } from 'src/User/user.module';
import { TokenModule } from 'src/Token/token.module';
import { JwtAuthGuard } from './Guards/JWT-auth.guard';
import { JWTStrategy } from './passportStrategy/Jwt.strategy';


@Module({
    imports: [
        UserModule,
        TokenModule,
        PassportModule,
        // .register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.SECRET_JWT,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtAuthGuard, JWTStrategy],
    controllers: [AuthController]
})
export class AuthModule { }

