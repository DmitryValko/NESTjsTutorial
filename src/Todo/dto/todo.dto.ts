import { IsString, IsBoolean, MinLength } from 'class-validator';


export class TodoCreateDTO {
    @IsString()
    @MinLength(4, {
        message: 'String be minimum 4 word!'
    })
    task: string;
    @IsBoolean()
    check: Boolean;
    @IsString()
    dataCreate: String;
    @IsString()
    dateSoon?: String
}