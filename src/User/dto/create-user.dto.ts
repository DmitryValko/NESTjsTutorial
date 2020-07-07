
import { IsEmail, IsNotEmpty, Min } from 'class-validator';




export class CreateUserDTO {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    readonly password2: string;
    @IsNotEmpty()
    readonly password: string;
    @IsNotEmpty()
    readonly name: string;
}