import { IsString, IsNotEmpty, Min } from 'class-validator';




export class refreshAuthDTO {
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
    @IsNotEmpty()
    @IsString()
    userId: string
}