import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { Response } from 'express';
import frontendConfig from 'src/config/frontend.config';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './guards/google-oauth/google-oauth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    @Inject(frontendConfig.KEY)
    private readonly frontendConfiguration: ConfigType<typeof frontendConfig>,

    //other way to access the frontendUrl from the env instead of using frontendConfiguration is using of configService as:
    private readonly configService: ConfigService,
  ) {}

  @Post('signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard) // this is the local strategy guard which is used to authenticate the user using email and password
  @Post('signin')
  login(
    @Request()
    req: {
      user: {
        id: number;
        name: string;
      };
    },
  ) {
    return this.authService.login(req.user.id, req.user.name);
  }

  @UseGuards(JwtAuthGuard) // only signed in user can call this route
  @Get('me')
  getMyProfile(
    @Request()
    req: {
      user: {
        id: number;
      };
    },
  ) {
    return this.authService.getMyProfile(req.user.id);
  }

  @UseGuards(RefreshAuthGuard) // this is the refresh token strategy guard which is used to authenticate the user using refresh token and get a new access token
  @Post('refresh')
  refresh(@Request() req) {
    return this.authService.refresh(req.user.id, req.user.name);
  }

  @UseGuards(GoogleOAuthGuard) // this is the google oauth strategy guard which is used to authenticate the user using google oauth and get a new access token
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleOAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {
    console.log('🚀 ~ AuthController ~ googleCallback ~ req:', req.user);

    const response = await this.authService.login(req.user.id, req.user.name);
    const params = new URLSearchParams();
    params.append('accessToken', response.accessToken);
    params.append('refreshToken', response.refreshToken);
    params.append('name', response.name);
    params.append('userId', response.id.toString());

    console.log('url of frontend', this.frontendConfiguration.frontendURL);

    // const frontendURL = this.frontendConfiguration.frontendURL;// we can access frontendURL like this or using the below method as
    const frontendURL = this.configService.get<string>('FRONTEND_URL');

    return res.redirect(
      `${frontendURL}/api/auth/google/callback?${params.toString()}`,
    );
  } //callback means redirect to some page when login

  @UseGuards(JwtAuthGuard) // only signed in user can call this route
  @Post('logout')
  async logOut(
    @Request()
    req: {
      user: {
        id: number;
      };
    },
  ) {
    return this.authService.logOut(req.user.id);
  }
}
