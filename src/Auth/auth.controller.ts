import { CreateUserDTO } from './../User/dto/create-user.dto';
import { Controller, Post, Body, Res, HttpStatus, ValidationPipe, UseGuards, Req } from "@nestjs/common";
import { LoginUserDTO } from "src/User/dto/login-user.dto";
import { UserService } from 'src/User/user.service';
import { Response, Request } from 'express';
import { TokenService } from 'src/Token/token.service';
import { AuthGuard } from '@nestjs/passport';
import { refreshAuthDTO } from './dto/refreshAuth.dto';
import { JwtAuthGuard } from './Guards/JWT-auth.guard';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) { }


    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Body(ValidationPipe) user: LoginUserDTO, @Res() res: Response): Promise<Response> {
        const userDate = await this.userService.modelUser.findOne({ email: user.email });
        const Accesstoken = this.tokenService.createAccessToken(userDate);
        const refreshToken = await this.tokenService.addRefreshToken(userDate);
        return res.status(200)
            .json({ "accessToken": `Bearer ${Accesstoken}`, refreshToken: refreshToken });
    }

    
    @Post('LogOut')
    @UseGuards(JwtAuthGuard)
    async logOut(@Body(ValidationPipe) data: refreshAuthDTO, @Res() res: Response): Promise<Response> {
        const user = await this.userService.modelUser.findById(data.userId);
        if (!user) return res.status(400).json({ "message": "dont correct userId" });
        const checkRefTok = await this.tokenService.checkRefreshToken(data.refreshToken.toString(), user);
        if (!checkRefTok) return res.status(400).json({ "message": "dont correct refreshToken" });
        this.authService.logOutUser(user._id, data.refreshToken);
        return res.status(200).json({ "message": 'User unAuth' });
    }

    @Post('registration')
    async registration(@Body(ValidationPipe) user: CreateUserDTO, @Res() res: Response): Promise<Response> {
        const userCreater = this.userService.create(user);
        (await userCreater).save();
        return res.status(HttpStatus.CREATED).json({
            "message": "succeess",
            "status": HttpStatus.CREATED
        })

    }

    @Post('refresh')
    async refresh(@Req() req: Request, @Body(ValidationPipe) data: refreshAuthDTO, @Res() res: Response): Promise<Response> {
        const user = await this.userService.modelUser.findById(data.userId);
        if (!user) return res.status(400).json({ "message": "dont correct userId" });
        const checkRefTok = await this.tokenService.checkRefreshToken(data.refreshToken.toString(), user);
        if (!checkRefTok) return res.status(400).json({ "message": "dont correct refreshToken" });
        const Accesstoken = this.tokenService.createAccessToken(user);
        return res.status(200).json({ "accessToken": `Bearer ${Accesstoken}` });
    }


}