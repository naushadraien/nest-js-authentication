import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import refreshConfig from 'src/config/refresh.config';
import { AuthService } from '../auth.service';
import { AuthJWTPayload } from '../types/auth.jwtPayload';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  //the second argument 'refresh-jwt' is the name of the strategy which will be used in the refresh token auth guard
  constructor(
    @Inject(refreshConfig.KEY)
    private refreshTokenConfiguration: ConfigType<typeof refreshConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'), // Extract the JWT from the refreshToken field in the request body
      ignoreExpiration: false,
      secretOrKey: refreshTokenConfiguration.secret, //passport-jwt will decrypt the refresh token coming from the request body using this secret key and will give you the payload object
    });
  }

  async validate(payload: AuthJWTPayload) {
    const userId = payload.sub;
    const user = await this.authService.validateRefreshToken(userId); //this returned userId object will be attached to the request object so that you can access it in the protected routes by using like   async login(@Request() req) {return req.user.id;}
    return user;
  }
}