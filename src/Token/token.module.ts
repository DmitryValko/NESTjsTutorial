import { Module } from '@nestjs/common';
import { TokenService } from './token.service'; 
import { UserModule } from 'src/User/user.module';


@Module({
    imports: [UserModule],
    providers: [TokenService],
    exports: [TokenService]
})
export class TokenModule { }