import { IsEmail, IsNotEmpty, Min } from 'class-validator';


export class LoginUserDTO {
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    // @Min(6)
    readonly password: string;

}